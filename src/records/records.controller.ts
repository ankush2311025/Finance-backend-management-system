import { Controller, UseGuards, Post, Get, Put, Delete, Body, Param, Query, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ROLES } from 'src/common/decorators/roles.decorator';
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { FilterRecordDto } from './dto/filter-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('Records')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('records')
export class RecordsController {

    constructor(private readonly recordsService : RecordsService){}
    
    @ApiBearerAuth()
    @ApiOperation({ summary : 'Create financial record'})
    @ApiResponse({ status : 201, description: 'Record created successfilly'})
    @Post()
    @ROLES('ADMIN')
    create(@Body() data: CreateRecordDto) {
    return this.recordsService.createRecord(data);
    }
    

    @ApiBearerAuth()
    @ApiOperation({ summary : 'Update financial record'})
    @ApiResponse({ status : 201, description: 'Record updated successfilly'})
    @Put(':id')
    @ROLES('ADMIN')
    update(@Param('id') id : number, @Body() body : UpdateRecordDto){
        return this.recordsService.updateRecord(id, body);
    }
    
    @ApiBearerAuth()
    @ApiOperation({ summary : 'Get record by id'})
    @Get(':id')
    @ROLES('ADMIN', 'VIEWER', 'ANALYST')
    getById(@Param('id') id : number , @Req() req : FilterRecordDto){
        return this.recordsService.findRecordById(id, req)
    }  
    
    
    @ApiBearerAuth()
    @ApiOperation({ summary : 'Get all record'})
    @Get()
    @ROLES('ADMIN', 'ANALYST')
    findAll(@Query() query : FilterRecordDto){
        return this.recordsService.getAllRecords(query);
    }
    

    @ApiBearerAuth()
    @ApiOperation({ summary : 'deleted financial record'})
    @ApiResponse({ status : 201, description: 'Record deleted successfilly'})
    @Delete(':id')
    @ROLES('ADMIN')
    deleteRecord(@Param('id') id : number){
        return this.recordsService.deleteRecord(id);
    }
}
