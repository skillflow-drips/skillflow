import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: { skills?: string[]; status?: string }) {
    return this.prisma.job.findMany({
      where: {
        ...(filters.status ? { status: filters.status as any } : {}),
        ...(filters.skills?.length ? { skills: { hasSome: filters.skills } } : {}),
      },
      include: { client: true, milestones: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.job.findUnique({
      where: { id },
      include: { client: true, milestones: true, applications: { include: { freelancer: true } } },
    });
  }

  async create(clientId: string, dto: any) {
    const { milestones, ...jobData } = dto;
    return this.prisma.job.create({
      data: {
        ...jobData,
        clientId,
        milestones: {
          create: milestones.map((m: any, i: number) => ({
            ...m,
            milestoneIndex: i,
          })),
        },
      },
      include: { milestones: true },
    });
  }

  async update(id: string, dto: any) {
    return this.prisma.job.update({ where: { id }, data: dto });
  }

  async cancel(id: string) {
    return this.prisma.job.update({ where: { id }, data: { status: 'CANCELLED' } });
  }
}
