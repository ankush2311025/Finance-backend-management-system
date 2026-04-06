import { IsNumber , IsEnum, IsString, IsDateString, IsOptional} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export enum RecordType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}

export class CreateRecordDto {
    @ApiProperty({example : 15000})
    @IsNumber()
    amount: number;
    
     @ApiProperty({example : 'salary'})
    @IsString()
    category: string;
    
     @ApiProperty({example : '2025-01-01'})
    @IsDateString()
    date : Date;
    
     @ApiProperty({example : 'monthly salary'})
    @IsOptional()
    @IsString()
    note? : string;
}