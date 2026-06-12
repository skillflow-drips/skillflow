import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  async notify(userId: string, title: string, message: string, type: 'INFO' | 'SUCCESS' | 'ALERT') {
    return {
      id: crypto.randomUUID(),
      userId,
      title,
      message,
      type,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
  }

  async getUnread(userId: string) {
    return [];
  }
}
