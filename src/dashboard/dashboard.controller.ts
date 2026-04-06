import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, } from 'src/auth/guards/jwt-auth.guard';
import { ROLES } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { DashboardService } from './dashboard.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('Dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('dashboard')
export class DashboardController {

    constructor(private dashboardService : DashboardService){}
    

    @Get()
    @ApiBearerAuth()
    @ApiOperation({ summary : 'Get dashboard summary'})
    @ROLES('VIEWER', 'ANALYST', 'ADMIN')
    getDashboardData(){
        if(!this.dashboardService){
            throw new Error('DashboardService is not available');
        }
        return this.dashboardService.getDashboardData();

    }

}
