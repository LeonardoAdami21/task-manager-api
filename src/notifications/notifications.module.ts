import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [NotificationsGateway, JwtService],
})
export class NotificationsModule {}
