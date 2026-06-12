import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  async logAction(userId: string, action: string, metadata: any) {
    this.logger.log(`Audit Log: User ${userId} performed ${action}`);

    return {
      userId,
      action,
      metadata,
      createdAt: new Date().toISOString(),
    };
  }
}
