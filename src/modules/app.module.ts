import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { RoomsModule } from './rooms/rooms.module';

import { APP_CONFIG } from '../config';

@Module({
  imports: [
    MongooseModule.forRoot(APP_CONFIG.databaseURL),
    AuthModule,
    UsersModule,
    ChatModule,
    RoomsModule,
  ],
})
export class ApplicationModule {}
