import { Module } from '@nestjs/common';
import { PermissionsModule } from './permissions/permissions.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/db/db.config';
import { DataSourceOptions } from 'typeorm';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { OrganizationModule } from './organization/organization.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ShellsheduleModule } from './shellshedule/shellshedule.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { QuantitiesModule } from './quantities/quantities.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions as DataSourceOptions),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDISHOST'),
          port: configService.get('REDISPORT'),
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: Number(configService.get('MAIL_PORT')),
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get('MAIL_FROM_EMAIL'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    PermissionsModule,
    EventEmitterModule.forRoot(),
    RoleModule,
    UserModule,
    OrganizationModule,
    AuthModule,
    ShellsheduleModule,
    ProjectsModule,
    TasksModule,
    QuantitiesModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
