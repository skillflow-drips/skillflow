import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async apply(@Request() req: any, @Body() body: any) {
    // README Requirement: Application logic validates credits before biding
    return this.applicationsService.applyToJob(
      req.user.id,
      body.jobId,
      body.bidAmount,
      body.pitch
    );
  }

  @Get('job/:id')
  async getByJob(@Param('id') id: string) {
    // Allows clients to see all applicants for their project
    return this.applicationsService.findAllByJob(id);
  }
}
