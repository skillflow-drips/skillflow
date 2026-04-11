import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DisputesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.dispute.findMany({
      include: { job: true, milestone: true, raisedBy: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.dispute.findUnique({
      where: { id },
      include: { job: true, milestone: true, raisedBy: true },
    });
  }

  async resolve(id: string, dto: { ruling: string; arbitratorId: string }) {
    return this.prisma.dispute.update({
      where: { id },
      data: {
        ruling: dto.ruling,
        arbitratorId: dto.arbitratorId,
        status: 'RESOLVED',
      },
    });
  }
}
