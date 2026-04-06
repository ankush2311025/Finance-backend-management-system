import { PartialType } from "@nestjs/mapped-types";
import { CreateRecordDto } from "./create-record.dto";
import { ApiProperty } from "@nestjs/swagger";


export class UpdateRecordDto extends PartialType(
    
    CreateRecordDto
){}