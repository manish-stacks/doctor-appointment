import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }


    @Get()
    getReport() {
        return this.reportService.getReport();
    }


    @Post()
    createReport(@Body() body: { name: string }) {
        return this.reportService.createReport(body.name);
    }

    @Get(':id')
    getReportById(@Param('id') id: number) {
        return this.reportService.getReportById(id);
    }
    @Put(':id')
    updateReport(@Param('id') id: number, @Body() body: { name: string }) {
        return this.reportService.updateReport(id, body.name);
    }

    @Delete(':id')
    deleteReport(@Param('id') id: number) {
        return this.reportService.deleteReport(id);
    }
}
