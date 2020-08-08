import { Injectable } from '@nestjs/common';
import AuthUserDto from './dto/auth-user.dto';
import { CmsAdminService } from '../cms-admin/cms-admin.service';
import axios, { AxiosResponse } from 'axios';
import { resetPasswordQuery } from './queries';

@Injectable()
export class AuthenticationService {
  constructor(private cmsAdminService: CmsAdminService) {}

  //reaches out to cms and returns token if everything goes well
  async login(authUserDto: AuthUserDto): Promise<string | null> {
    return this.cmsAdminService.loginWithCMSCredentials(authUserDto);
  }

  /** returns true for if the change is successful */
  async resetPassword(
    authUserDto: AuthUserDto,
    token: string,
  ): Promise<boolean> {
    const resetQueryResponse: AxiosResponse = await axios.post(
      this.cmsAdminService.authUrl,
      resetPasswordQuery(authUserDto),
      {
        headers: {
          'Content-Type': 'application/graphql',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return resetQueryResponse.data?.data?.changePassword?.changed ?? false;
  }
}
