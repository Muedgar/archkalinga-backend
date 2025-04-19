import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization } from './entities/organization.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Organization])],
  controllers: [],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}
