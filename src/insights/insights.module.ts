import { Module } from '@nestjs/common';
import { InsightsController } from './insights.controller';
import { InsightsService } from './insights.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from 'src/records/entities/record.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Record])],
  controllers: [InsightsController],
  providers: [InsightsService]
})
export class InsightsModule {}
