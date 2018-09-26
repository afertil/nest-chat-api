import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as jwt from 'jsonwebtoken';
import { APP_CONFIG } from '../../../config';
import { JwtService } from '../../auth/jwt/jwt.service';
import { User } from '../../users/interfaces/user.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async resolve() {
    return async (req, res, next) => {
      let authorization = <string>req.headers.authorization;

      if (authorization && authorization.split(' ')[0] === 'Bearer') {
        const token = authorization.split(' ')[1];

        const user: User = await this.jwtService.verify(token);
        // req.payload = payload;
        next();
      } else {
        throw new HttpException('Unauthorized access', HttpStatus.BAD_REQUEST);
      }
    };
  }
}
