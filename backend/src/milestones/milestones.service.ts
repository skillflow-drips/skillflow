import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MilestonesService {
  constructor(private prisma: PrismaService) {}

  async submitWork(milestoneId: string, deliveryIpfsHash: string) {
    const milestone = await this.prisma.milestone.findUnique({ where: { id: milestoneId } });
    if (!milestone) throw new NotFoundException('Milestone not found');

    return this.prisma.milestone.update({
      where: { id: milestoneId },
      data: {
        status: 'SUBMITTED',
        deliveryIpfsHash,
      },
    });
  }

  async approveAndRelease(milestoneId: string) {
    // Logic for verifying Soroban confirmation is handled by the indexer
    return this.prisma.milestone.update({
      where: { id: milestoneId },
      data: { status: 'APPROVED' },
    });
  }
}
