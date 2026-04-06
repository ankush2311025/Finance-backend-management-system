import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Role } from 'src/users/entities/role.entity';
import { ConfigService } from '@nestjs/config';

@Module({
  imports : [
  TypeOrmModule.forFeature([User, Role]),
  
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
],
  controllers: [AuthController],
  providers: [AuthService,
    JwtStrategy
  ]
})
export class AuthModule {}
