import { IsOptional, IsEnum, IsString, isDateString, IsDateString } from "class-validator";
import { RecordType } from "./create-record.dto";
import { ApiProperty } from "@nestjs/swagger";

export class FilterRecordDto{

    @ApiProperty({example : "INCOME" })
    @IsOptional()
    @IsEnum(RecordType)
    type? : RecordType;
    
    @ApiProperty({example : "salary"})
    @IsOptional()
    @IsString()
    category? : string;
    
    @ApiProperty({example : '2025-01-01'})
    @IsOptional()
    @IsDateString()
    startDate? : string;
    

    @ApiProperty({example : '2025-02-30'})
    @IsOptional()
    @IsDateString()
    endDate? : string;

    @IsOptional()
    @IsString()
    page? : string;

    @IsOptional()
    @IsString()
    limit? : string;
}