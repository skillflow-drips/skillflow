import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async findAll(@Query() filters: any) {
    return this.jobsService.getPublicFeed(filters);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.jobsService.getJobWithMilestones(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createJob(@Body() body: any) {
    return this.jobsService.initializeProject(body);
  }
}
