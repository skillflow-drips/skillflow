import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByStellarAddress(stellarAddress: string) {
    return this.prisma.user.findUnique({ where: { stellarAddress } });
  }

  async findOrCreate(stellarAddress: string) {
    let user = await this.prisma.user.findUnique({ where: { stellarAddress } });
    if (!user) {
      user = await this.prisma.user.create({
        data: { stellarAddress, name: stellarAddress.slice(0, 8) + '...' },
      });
    }
    return user;
  }

  async update(id: string, dto: { name?: string; bio?: string; skills?: string[] }) {
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  async getUserJobs(id: string) {
    return this.prisma.job.findMany({
      where: { OR: [{ clientId: id }, { freelancerId: id }] },
      include: { milestones: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
