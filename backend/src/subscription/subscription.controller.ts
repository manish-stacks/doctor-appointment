import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) { }

    @Get()
    async findAll() {
        return this.subscriptionService.findAll();
    }

    @Post()
    async create(@Body() body: { name: string; plan: string; totalAppointment: number }) {
        return this.subscriptionService.create(body.name, body.plan, body.totalAppointment);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.subscriptionService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: { name: string; plan: string; totalAppointment: number }) {
        return this.subscriptionService.update(id, body.name, body.plan, body.totalAppointment);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.subscriptionService.remove(id);
    }
}
