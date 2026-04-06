import { Controller , Get , Delete, Param, UseGuards, Query,Req, ParseIntPipe , Patch, Body, ForbiddenException} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ROLES } from 'src/common/decorators/roles.decorator'
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';


@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
    constructor(private usersService : UsersService){}
    

    @ApiBearerAuth()
    @ApiOperation({ summary : 'Get all users'})
    @Get()
    @ROLES('ADMIN')
    getAllUsers(@Query() query){
        return this.usersService.findAll({query});

    }
    
    @ApiBearerAuth()
    @ApiOperation({ summary : 'Update user by id'})
    @ApiResponse({ status : 201, description: 'user updated successfilly'})
    @Patch(':id')
    @ROLES('ADMIN')
    updateUser(@Param('id', ParseIntPipe)id : number, @Body() body, @Req() req ){
        return this.usersService.updateUser(id, body, req.user);
    }
    

    @ApiBearerAuth()
    @ApiOperation({ summary : 'delete user by id'})
    @ApiResponse({ status : 201, description: 'user deleted successfilly'})
    @Delete(':id')
    @ROLES('ADMIN')
    deleteUser(@Param('id', ParseIntPipe) id : number){
        return this.usersService.deleteUser(id);
    }
    
    @ApiBearerAuth()
    @ApiOperation({ summary : 'Get user by id'})
    @Get('profile')
    @ROLES('ADMIN', 'VIEWER')
    getProfile(@Req() req){
        return this.usersService.getUserById(req.user.id)
    }
}
