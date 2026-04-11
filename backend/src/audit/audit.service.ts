import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private prisma: PrismaService) {}

  async logAction(userId: string, action: string, metadata: any) {
    this.logger.log(`Audit Log: User ${userId} performed ${action}`);
    
    return this.prisma.auditLog.create({
      data: {
        userId,
        action,
        metadata: JSON.stringify(metadata),
      },
    });
  }
}
