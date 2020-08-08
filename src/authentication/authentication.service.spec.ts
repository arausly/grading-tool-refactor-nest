import { Test } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { ConfigModule } from '@nestjs/config';
import { CmsAdminModule } from '../cms-admin/cms-admin.module';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockAxiosResponseAuth = {
  data: {
    data: {
      login: {
        token: 'dummyToken',
      },
    },
  },
};

const resetRespAxiosMock = {
  data: {
    data: {
      changePassword: {
        changed: true,
      },
    },
  },
};

const mockUser = {
  email: 'devtest@cars45.com',
  password: 'pass123',
};

describe('AuthenticationService', () => {
  let authService: AuthenticationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule, CmsAdminModule],
      providers: [AuthenticationService],
    }).compile();

    authService = await module.get<AuthenticationService>(
      AuthenticationService,
    );
  });

  describe('login with Token', () => {
    it('should return token for valid credentials', async () => {
      mockedAxios.post.mockResolvedValue(mockAxiosResponseAuth);
      const mockToken = mockAxiosResponseAuth.data.data.login.token;
      const loginToken = await authService.login(mockUser);
      expect(loginToken).toEqual(mockToken);
    });

    it('should return null for invalid credentials', async () => {
      mockAxiosResponseAuth.data.data.login = null;
      const loginToken = await authService.login(mockUser);
      expect(loginToken).toBeNull();
    });
  });

  describe('reset Password', () => {
    it('should return true for successful password change', async () => {
      mockedAxios.post.mockResolvedValue(resetRespAxiosMock);
      const dummyToken = 'pseudo-token';
      const resetResponse = await authService.resetPassword(
        mockUser,
        dummyToken,
      );
      expect(resetResponse).toBeTruthy();
    });
  });
});
