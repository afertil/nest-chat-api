import { Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { JwtService } from '../auth/jwt/jwt.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  components: [ChatGateway]
})
export class ChatModule {}
