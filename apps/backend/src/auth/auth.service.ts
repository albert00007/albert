import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(password: string): Promise<any> {
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');
    if (password === adminPassword) {
      // In a real application, you would fetch user details from a database
      // For this task, we'll return a simple admin user object
      const user = { userId: 1, username: 'admin', roles: ['admin'] };
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
