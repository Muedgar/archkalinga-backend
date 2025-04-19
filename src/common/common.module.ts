import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MAIL_QUEUE } from './constants';
import { EmailService } from './services';
import { EmailProcessor } from './processors';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

@Module({
  imports: [
    BullModule.registerQueue({
      name: MAIL_QUEUE,
      redis: {
        host: configService.get('REDISHOST'),
        port: configService.get('REDISPORT'),
        password: configService.get('REDIS_PASSWORD'),
      },
    }),
  ],
  providers: [EmailService, EmailProcessor],
  exports: [EmailService],
})
export class CommonModule {}
