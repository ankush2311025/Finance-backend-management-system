import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { User } from './entities/users.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>
    ){}

    async findAll(query){
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page -1)*limit;

        const [data, total] = await this.userRepository.findAndCount({
            select : ['id', 'name', 'email', 'role', 'status'], 
            skip,
            take : limit,
            order : { id : 'DESC'},
        });

        return {
            data, 
            total, 
            page, 
            lastPage : Math.ceil(total/limit)
        }
    }

    async getUserById(id: Number){
        const user = await this.userRepository.findOne({ where : {id: Number(id) as number },select : ['id', 'name', 'email', 'role', 'status'] });
        if (!user){
            throw new NotFoundException('User not found');
        }
        return user;
    }
    async updateUser(id : number, data : any, currentUser : any){
        const user = await this.userRepository.findOne({ where : { id }});
        if(!user){
            throw new NotFoundException('User not found');
        }
        if(data.name) user.name = data.name;
        if(data.role){
            if(currentUser.role !== 'ADMIN'){
                throw new ForbiddenException('Only admin can change role');
            }
            user.role = data.role;
        }

        await this.userRepository.save(user);
        return { message : 'User updated successfully'};
    }

    async deleteUser(id : number){
        const user = await this.userRepository.findOne({ where : {id}});
        if(!user){
            throw new NotFoundException('User not found');
        }
        await this.userRepository.delete(id);
        return{ message : 'User deleted successfully'};
    }

}
