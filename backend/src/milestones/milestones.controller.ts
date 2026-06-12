import { Controller, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('milestones')
export class MilestonesController {
  constructor(private milestonesService: MilestonesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id/submit')
  async submit(@Param('id') id: string, @Body() body: { proofUrl?: string; deliveryIpfsHash?: string }) {
    // Allows freelancers to submit their work for a specific milestone
    return this.milestonesService.submitWork(id, body.deliveryIpfsHash || body.proofUrl || '');
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/approve')
  async approve(@Param('id') id: string, @Request() req: any) {
    // Only the client (job owner) can approve and release the escrow
    return this.milestonesService.approveAndRelease(id);
  }
}
