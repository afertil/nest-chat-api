import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';

import { ApplicationModule } from './modules/app.module';
import { WsAdapter } from './modules/common/adapters/ws-adapter';

const app = express();

app
  .options('*', cors())
  .use(cors())
  .use(helmet())
  .use(compression())
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  );
// .use('/images', express.static(`${__dirname}/../uploads/images`));

async function bootstrap() {
  const nestApp = await NestFactory.create(ApplicationModule, app);

  // Add a route prefix
  nestApp.setGlobalPrefix('api');

  // Instantiate the WS adapter
  // nestApp.useWebSocketAdapter(new WsAdapter());

  await nestApp.listen(3000);
}

bootstrap();
