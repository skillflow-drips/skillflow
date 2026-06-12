import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TokensService {
  // README Requirement: 1 USDC = 5 Application Tokens (Credits)
  private readonly TOKENS_PER_USDC = 5;

  constructor(private prisma: PrismaService) {}

  async creditAccount(userId: string, usdcAmount: number, txHash: string) {
    const tokensToCredit = usdcAmount * this.TOKENS_PER_USDC;

    return this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { tokenBalance: { increment: tokensToCredit } },
      }),
      this.prisma.tokenPurchase.create({
        data: {
          userId,
          txHash,
          usdcAmount,
          tokensAwarded: tokensToCredit,
          confirmed: true,
        },
      }),
    ]);
  }
}
