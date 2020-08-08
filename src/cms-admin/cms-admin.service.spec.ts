import axios from 'axios';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { CmsAdminService } from './cms-admin.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockAxiosResponse = {
  data: {
    data: {
      login: {
        token: 'dummyToken',
      },
    },
  },
};

const mockUser = {
  email: 'devtest@cars45.com',
  password: 'pass123',
};

describe('CmsAdminService', () => {
  let cmsAdminService: CmsAdminService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [CmsAdminService],
    }).compile();
    cmsAdminService = module.get<CmsAdminService>(CmsAdminService);
  });

  describe('Get Auth Token', () => {
    it('should token for valid credentials', async () => {
      mockedAxios.post.mockResolvedValue(mockAxiosResponse);
      const mockToken = mockAxiosResponse.data.data.login.token;
      const loginToken = await cmsAdminService.loginWithCMSCredentials(
        mockUser,
      );
      expect(loginToken).toEqual(mockToken);
    });

    it('should return null if something goes wrong', async () => {
      mockAxiosResponse.data = null;
      mockedAxios.post.mockResolvedValue(mockAxiosResponse);
      const loginToken = await cmsAdminService.loginWithCMSCredentials(
        mockUser,
      );
      expect(loginToken).toBeNull();
    });
  });
});
