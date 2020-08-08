import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default class TypeOrmConfig {
  constructor(private configService: ConfigService) {}

  get config(): TypeOrmModuleOptions {
    const type = this.configService.get('DATABASE_TYPE');
    const host = this.configService.get<string>('DATABASE_HOST');
    const port = this.configService.get<number>('DATABASE_PORT');
    const username = this.configService.get<string>('DATABASE_USERNAME');
    const password = this.configService.get<string>('DATABASE_PASSWORD');
    const database = this.configService.get<string>('DATABASE_NAME');
    const synchronize = this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
    const entities = [__dirname + '/../**/*.entity{.ts,.js}'];

    return {
      type,
      host,
      port,
      username,
      password,
      database,
      synchronize,
      entities,
    };
  }
}
