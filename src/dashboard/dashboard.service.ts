import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from 'src/records/entities/record.entity';
import { Repository } from 'typeorm';


@Injectable()
export class DashboardService {
    constructor (
        @InjectRepository(Record)
        private recordRepository : Repository<Record>
    ){}

    async getDashboardData(){
        const totalIncome = await this.recordRepository
        .createQueryBuilder('record')
        .select('SUM(record.amount)', 'sum')
        .where('record.type = :type', { type: 'INCOME'})
        .getRawOne();

        const totalExpense = await this.recordRepository
        .createQueryBuilder('record')
        .select('SUM(record.amount)', 'sum')
        .where('record.type = :type', { type: 'EXPENSE'})
        .getRawOne();

        const categorydata = await this.recordRepository
        .createQueryBuilder('record')
        .select('record.category', 'category')
        .addSelect('SUM(record.amount)', 'total')
        .groupBy('record.category')
        .getRawOne();

        const recent = await this.recordRepository.find({
            order : { date : 'DESC'},
            take : 5, 
        })

        const income = Number(totalIncome.sum) || 0;
        const expense = Number(totalExpense.sum) || 0;

        return {
            totalIncome : income,
            totalExpense : expense,
            categorydata : categorydata,
            netBalance : income - expense,
            recent : recent,
        }

    }
}
