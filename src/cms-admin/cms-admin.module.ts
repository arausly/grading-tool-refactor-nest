import { Module } from '@nestjs/common';
import { CmsAdminService } from './cms-admin.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CmsAdminService],
  exports: [CmsAdminService],
})
export class CmsAdminModule {}
