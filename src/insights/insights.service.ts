import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Record } from 'src/records/entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InsightsService {

    constructor( 
        @InjectRepository(Record)
        private recordRepository : Repository<Record>
    ){}

    async getMonthlyTrends(){
        const data = await this.recordRepository
        .createQueryBuilder('record')
        .select('MONTH(record.date)', 'month')
        .addSelect('SUM(record.amount)', 'total')
        .addSelect('record.type', 'type')
        .groupBy('month')
        .addGroupBy('record.type')
        .orderBy('month', 'ASC')
        .getRawMany()

        return data
    }

    async getWeeklyTrends(){
        const data = await this.recordRepository
        .createQueryBuilder('record')
        .select('DATE(record.date)', 'date')
        .addSelect('SUM(record.amount)', 'total')
        .groupBy('date')
        .orderBy('date', 'DESC')
        .limit(7)
        .getRawMany()

        return data
    }

    async getCategoryInsights(){
        const data = await this.recordRepository
        .createQueryBuilder('record')
        .select('record.category', 'category')
        .addSelect('SUM(record.amount)', 'total')
        .where('record.type = :type', { type: 'EXPENSE'})
        .groupBy('record.category')
        .orderBy('total', 'DESC')
        .getRawMany();
        return data
    }

}
