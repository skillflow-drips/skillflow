import { Controller, Get, Post, Body, Param, Query, Request, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async findAll(@Query() filters: any) {
    return this.jobsService.findAll(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jobsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createJob(@Request() req: any, @Body() body: any) {
    return this.jobsService.create(req.user.id, body);
  }
}
