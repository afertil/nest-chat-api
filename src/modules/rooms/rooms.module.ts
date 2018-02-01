import { Module, RequestMethod, MiddlewaresConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomSchema } from './schemas/room.schema';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
  controllers: [RoomsController],
  components: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {
  // public configure(consumer: MiddlewaresConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes(RoomsController);
  // }
}
