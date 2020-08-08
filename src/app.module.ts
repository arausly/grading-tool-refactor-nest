import { Module } from '@nestjs/common';
import { CmsAdminModule } from './cms-admin/cms-admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { CarsModule } from './cars/cars.module';
import TypeOrmConfig from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradesModule } from './grades/grades.module';

const typeOrmConfig = new TypeOrmConfig(new ConfigService());
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig.config),
    AuthenticationModule,
    CmsAdminModule,
    CarsModule,
    GradesModule,
  ],
})
export class AppModule {}
