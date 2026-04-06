import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignupDto{
    
    @ApiProperty({example : 'abc123@gamil.com'})
    @IsEmail()
    email : string;
    
    @ApiProperty({example : 'xxxxxxxx'})
    @IsString()
    @MinLength(8)
    password : string;
    
    @ApiProperty({example : 'abc'})
    @IsString()
    name : string;
}