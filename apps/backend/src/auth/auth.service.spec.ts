import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-jwt-token'),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user object when password matches', async () => {
      mockConfigService.get.mockReturnValue('correct-password');

      const result = await service.validateUser('correct-password');
      expect(result).toEqual({
        userId: 1,
        username: 'admin',
        roles: ['admin'],
      });
      expect(mockConfigService.get).toHaveBeenCalledWith('ADMIN_PASSWORD');
    });

    it('should return null when password does not match', async () => {
      mockConfigService.get.mockReturnValue('correct-password');

      const result = await service.validateUser('wrong-password');
      expect(result).toBeNull();
    });

    it('should return null when ADMIN_PASSWORD is not configured', async () => {
      mockConfigService.get.mockReturnValue(undefined);

      const result = await service.validateUser('any-password');
      expect(result).toBeNull();
    });

    it('should return null for empty password', async () => {
      mockConfigService.get.mockReturnValue('correct-password');

      const result = await service.validateUser('');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = { userId: 1, username: 'admin', roles: ['admin'] };

      const result = await service.login(user);
      expect(result).toEqual({ access_token: 'mock-jwt-token' });
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: 'admin',
        sub: 1,
        roles: ['admin'],
      });
    });

    it('should include user roles in JWT payload', async () => {
      const user = { userId: 2, username: 'editor', roles: ['editor'] };

      await service.login(user);
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: 'editor',
        sub: 2,
        roles: ['editor'],
      });
    });
  });
});
