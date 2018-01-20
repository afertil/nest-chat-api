import { Controller, Post, HttpStatus, HttpCode, Get, Request, Response, Body, HttpException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('/login')
  async login(@Request() req): Promise<any> {
    const body = req.body;

    if (!body) throw new HttpException('Body is missing', HttpStatus.BAD_REQUEST);
    if (!body.email || !body.password) throw new HttpException('Missing email or password', HttpStatus.BAD_REQUEST);

    return await this.authService.sign(body);
  }

  @Post('/refresh-token')
  async refreshToken(@Request() req): Promise<any> {
    const body = req.body;

    return await this.authService.refreshToken(body.refreshToken);
  }
}
