import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async applyToJob(freelancerId: string, jobId: string, bidAmount: number, pitch: string) {
    const user = await this.prisma.user.findUnique({ where: { id: freelancerId } });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    // Safety check: Ensure freelancer has at least 1 credit
    if (user.tokenBalance < 1) {
      throw new BadRequestException('Insufficient tokens to apply.');
    }

    return this.prisma.$transaction([
      this.prisma.application.create({
        data: {
          freelancerId,
          jobId,
          proposedAmount: bidAmount,
          coverLetter: pitch,
        },
      }),
      this.prisma.user.update({
        where: { id: freelancerId },
        data: { tokenBalance: { decrement: 1 } },
      }),
    ]);
  }

  async findAllByJob(jobId: string) {
    return this.prisma.application.findMany({
      where: { jobId },
      include: { freelancer: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
