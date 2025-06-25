import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { Role, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = (await this.usersService.findByEmail(email)) as User & {
      role?: Role;
    };
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return {
      id: user.id,
      email: user.email,
      roles: user.role ? user.role.name : '',
    };
  }

  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles || '',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
