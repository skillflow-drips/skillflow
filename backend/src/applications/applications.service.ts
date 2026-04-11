import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async applyToJob(freelancerId: string, jobId: string, bidAmount: number, pitch: string) {
    const user = await this.prisma.user.findUnique({ where: { id: freelancerId } });
    
    // Safety check: Ensure freelancer has at least 1 credit
    if (user.credits < 1) {
      throw new BadRequestException('Insufficient credits to apply.');
    }

    return this.prisma.$transaction([
      this.prisma.application.create({
        data: { freelancerId, jobId, bidAmount, pitch }
      }),
      this.prisma.user.update({
        where: { id: freelancerId },
        data: { credits: { decrement: 1 } }
      })
    ]);
  }
}
