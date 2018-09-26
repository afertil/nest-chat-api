import { Module } from '@nestjs/common';

// Modules
import { RoomsModule } from '../rooms/rooms.module';
import { AuthModule } from '../auth/auth.module';

// Components
import { ChatGateway } from './chat.gateway';
import { JwtService } from '../auth/jwt/jwt.service';
import { RoomsService } from '../rooms/rooms.service';


@Module({
  imports: [AuthModule, RoomsModule],
  providers: [ChatGateway],
})
export class ChatModule {}
