import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record, RecordType } from './entities/record.entity';
import { Repository, Between } from 'typeorm';
import { FilterRecordDto } from './dto/filter-record.dto';

@Injectable()
export class RecordsService {
    constructor(
        @InjectRepository(Record)
        private recordsRepository: Repository<Record>,
    ) {}

    async createRecord(data) {
    const { userId, ...rest } = data;

    return this.recordsRepository.save({
        ...rest,
        user: { id: userId },
    });
    }

    async getAllRecords(filter: {
    type?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
}) {
    const { type, category, startDate, endDate } = filter;

    return this.recordsRepository.find({
        where: {
            ...(type && { type: type.toUpperCase() as RecordType }),
            ...(category && { category }),
            ...(startDate && endDate && {
                date: Between(new Date(startDate), new Date(endDate)),
            }),
        },
    });
}

    async findRecordById(id : number, user){
        let record;
        if (user.role.name == 'VIEWER'){
            record = await this.recordsRepository.findOne({ where: { id, user: { id: user.id}}})
        }
        else {
            record = await this.recordsRepository.findOne({ where : { id}})
        }

        if(! record){
            throw new NotFoundException('Record not found ')
        }

        return record;
    }

    async updateRecord(id: number, data: Partial<Record>) {
        const record = await this.recordsRepository.findOne({ where: { id } });

        if (!record) {
            throw new NotFoundException('Record not found');
        }

        await this.recordsRepository.update(id, data);
        return { message: 'Record updated successfully' };
    }

    async deleteRecord(id: number) {
        const record = await this.recordsRepository.findOne({ where: { id } });

        if (!record) {
            throw new NotFoundException('Record not found');
        }

        await this.recordsRepository.delete(id);
        return { message: 'Record deleted successfully' };
    }

    async findAll (query : FilterRecordDto){
        const {
            type, 
            category, 
            startDate,
            endDate,
            page,
            limit,
        } = query;

        const currentPage = Number(page) || 1;
        const take = Number(limit) || 10;
        const skip = (currentPage -1)*take ;

        const where : any = {};
        if(type) where.type = type;
        if(category) where.category = category;

        if(startDate && endDate){
            where.date = Between(new Date(startDate), 
        new Date(endDate)
    );
}

    const [data, total] = await this.recordsRepository.findAndCount({
        where,
        skip,
        take,
        order : { date : 'DESC'},
    })
        

        return {
            data, 
            total,
            page : currentPage,
            lastPage : Math.ceil(total/take),
        }
    }
}