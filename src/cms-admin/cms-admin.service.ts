import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AuthUserDto from 'src/authentication/dto/auth-user.dto';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class CmsAdminService {
  constructor(private configService: ConfigService) {}

  get superCredentials(): AuthUserDto {
    const email = this.configService.get<string>('FCG_DEV_USER');
    const password = this.configService.get<string>('FCG_DEV_PASSWORD');
    return {
      email,
      password,
    };
  }

  get baseRef() {
    return this.configService.get<string>('FCG_BASE_HREF');
  }

  get authUrl() {
    return `${this.baseRef}auth/`;
  }

  async loginWithCMSCredentials(
    authUserDto: AuthUserDto,
  ): Promise<string | null> {
    const { email, password } = authUserDto;

    const authQuery = `
      {
          login(
              email: "${email}",
              password: "${password}"
          ) {
              token
          }
      }
  `;
    const authQueryResponse: AxiosResponse = await axios.post(
      this.authUrl,
      authQuery,
      {
        headers: {
          'Content-Type': 'application/graphql',
        },
      },
    );

    return authQueryResponse.data?.data?.login?.token ?? null;
  }

  //gets developer token for high privilege activity in cms
  async getRootPermission(): Promise<string | null> {
    return this.loginWithCMSCredentials(this.superCredentials);
  }
}
