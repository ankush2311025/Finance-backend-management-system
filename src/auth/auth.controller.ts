import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor (private readonly AuthService : AuthService){} // dependency injection of authservice and readonly to prevent modification of the service instance

    @Post('signup')
    @ApiOperation({summary : 'Signup user'})
    signup(@Body() body : SignupDto){
        return this.AuthService.signup(body.email, body.password, body.name);

    }
    @Post('login')
    @ApiOperation({summary : 'login user'})
    login(@Body() body : LoginDto){
        return this.AuthService.login(body.email, body.password);
    }
}
