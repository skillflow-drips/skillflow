import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async notify(userId: string, title: string, message: string, type: 'INFO' | 'SUCCESS' | 'ALERT') {
    return this.prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
        isRead: false
      }
    });
  }

  async getUnread(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId, isRead: false },
      orderBy: { createdAt: 'desc' }
    });
  }
}
