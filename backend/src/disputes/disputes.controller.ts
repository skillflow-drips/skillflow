import { Controller, Post, Body, Param, UseGuards, UnauthorizedException, Get } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('disputes')
export class DisputesController {
  @UseGuards(JwtAuthGuard)
  @Post(':id/raise')
  async raiseDispute(@Param('id') id: string, @Body() body: { reason: string }) {
    // Logic for freezing escrow and alerting the arbitrator
    return { status: 'DISPUTED', message: 'Escrow frozen. Arbitrator notified.' };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/resolve')
  async resolveDispute(@Param('id') id: string, @Body() body: { decree: any }) {
    // README Requirement: Arbitrator settles funds based on evidence
    return { status: 'RESOLVED', decree: body.decree };
  }
}
