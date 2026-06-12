import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(stellarAddress: string) {
    const user = await this.prisma.user.upsert({
      where: { stellarAddress },
      update: {},
      create: {
        stellarAddress,
        name: `${stellarAddress.slice(0, 8)}...`,
      },
    });

    return {
      accessToken: await this.jwt.signAsync({
        sub: user.id,
        stellarAddress: user.stellarAddress,
      }),
      user,
    };
  }
}
