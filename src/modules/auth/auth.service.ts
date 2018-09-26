import { Injectable, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

import { UsersService } from './../users/users.service';
import { User } from '../users/interfaces/user.interface';
import { JwtService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Verifies the user used the right credentials
   *
   * @param signedUser
   *
   * @returns {Boolean} isValid - true if the user can be authenticated
   */
  private async checkUserPassword(
    signedUser: User,
    password: string
  ): Promise<Boolean> {
    if (signedUser.password !== password) {
      return false;
    }

    return true;
  }

  /**
   * Signs the user to the application by generating JWT tokens
   *
   * @param credentials - The user credentials
   * @returns data - The access and the refresh token to authenticate the user and the user
   */
  async sign(credentials: { email: string; password: string }): Promise<any> {
    const user = await this.usersService.findOne({ email: credentials.email });
    if (!user)
      throw new HttpException(
        'The specified user does not exists',
        HttpStatus.BAD_REQUEST
      );

    const serializedUser = user.schema.methods.serialize(user);
    const isValid = await this.checkUserPassword(user, credentials.password);
    if (!isValid)
      throw new HttpException(
        'The email/password combinaison is invalid',
        HttpStatus.BAD_REQUEST
      );

    const tokens = await this.jwtService.generateToken(serializedUser);

    return { tokens, user: serializedUser };
  }

  /**
   * Generating new JWT tokens to keep the user authenticated
   *
   * @param token
   * @returns data - The new access and the refresh token to authenticate the user and the user
   */
  async refreshToken(token: string): Promise<any> {
    const user: User = await this.jwtService.verify(token);
    const tokens = await this.jwtService.generateToken(user);

    return { tokens, user };
  }
}
