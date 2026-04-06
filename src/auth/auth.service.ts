import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Role, RoleType } from 'src/users/entities/role.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) 
        private userRepository: Repository<User>,
        private jwtService : JwtService,
        @InjectRepository(Role)
        private roleRepository : Repository<Role>,
    ) {}
    async signup(email: string, password: string, name : string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = await this.roleRepository.findOne({ where : { name : RoleType.VIEWER}});
        if (!role) {
            throw new Error('Role not found');
        }
        console.log(role);
        
        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            status : 'active', // abhi default rakha hai , later we can add functinality to change status based an user 
            
        });
        user.role = role 
        return this.userRepository.save(user);
    }
    
    async login(email : string, password: string,){
        const user = await this.userRepository.findOne({ where : { email , },  relations : ['role']});
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error ('Invalid Password');
        }
        console.log(user)
        const payload = { 
            id : user.id,
            role : user.role.name,
        }
        return {
            access_token : this.jwtService.sign(payload),
        }
    }

}