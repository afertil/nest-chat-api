import { Module } from '@nestjs/common';

// Modules
import { UsersModule } from './../users/users.module';

// Components
import { AuthService } from './auth.service';
import { JwtService } from './jwt/jwt.service';

// Controllers
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
  exports: [JwtService]
})
export class AuthModule {}
