import { Module, RequestMethod, MiddlewaresConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  components: [UsersService],
  exports: [UsersService]
})
export class UsersModule {
  public configure(consumer: MiddlewaresConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes(UsersController);
  }
}
