import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User} from './entities/users.entity';
import { Role} from './entities/role.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [
    TypeOrmModule.forFeature([User, Role]) //registering the User and Role entities with TypeORM so that they can be used in the UsersService for database operations 
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
