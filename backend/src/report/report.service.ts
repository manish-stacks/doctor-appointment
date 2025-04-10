import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';

@Injectable()
export class ReportService {
    constructor(@InjectRepository(Report) private readonly reportRepository: Repository<Report>) { }

    async getReport() {
        return this.reportRepository.find();
    }

    async createReport(name: string) {
        const report = this.reportRepository.create({ name });
        return this.reportRepository.save(report);
    }
    async getReportById(id: number) {
        return this.reportRepository.findOne({ where: { id } });
    }
    async updateReport(id: number, name: string) {
        const report = await this.reportRepository.findOne({ where: { id } });
        if (!report) return 'Report not found';
        report.name = name;
        return this.reportRepository.save(report);
    }

    async deleteReport(id: number) {
        return this.reportRepository.delete({ id });
    }
}
