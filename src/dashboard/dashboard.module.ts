import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from 'src/records/entities/record.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Record])],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
