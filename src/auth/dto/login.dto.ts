import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto{
    @ApiProperty({example : 'abc123@gamil.com'})
    @IsEmail()
    email : string;
    
    @ApiProperty({example : 'xxxxxxx'})
    @IsString()
    password : string;
}