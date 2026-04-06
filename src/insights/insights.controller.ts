import { Controller , Get , UseGuards} from '@nestjs/common';
import {ROLES } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { InsightsService } from './insights.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('insights')
@UseGuards( JwtAuthGuard, RolesGuard)
@Controller('insights')
export class InsightsController {
    constructor(
       private insightsService: InsightsService
    ){}

    @Get('/monthly')
    @ApiBearerAuth()
    @ApiOperation({summary : 'Get financial insights monthlywise'})
    @ROLES('ADMIN', 'ANALYST')
    getMonthly(){
         if(!this.insightsService){
            throw new Error('InsightsService is not available')
        }
        return this.insightsService.getMonthlyTrends();
    }

    @Get('/weekly')
    @ApiBearerAuth()
    @ApiOperation({summary : 'Get financial insights weeklywise'})
    @ROLES('ADMIN', 'ANALYST')
    getWeekly(){
         if(!this.insightsService){
            throw new Error('InsightsService is not available')
        }
        return this.insightsService.getWeeklyTrends();

    }

    @Get('/category-expenses')
    @ApiBearerAuth()
    @ApiOperation({summary : 'Get financial insights categorywise'})
    @ROLES('ADMIN', "ANALYST")
    getCategoryInsights(){
        if(!this.insightsService){
            throw new Error('InsightsService is not available')
        }
        return this.insightsService.getCategoryInsights();
    }}
