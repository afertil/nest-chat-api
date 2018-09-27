import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as rateLimit from 'express-rate-limit';
import * as express from 'express';
import * as helmet from 'helmet';

import { ApplicationModule } from './modules/app.module';

const app = express();

app.use(helmet())
  .use(compression())
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  .use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }));

async function bootstrap() {
  const nestApp = await NestFactory.create(ApplicationModule, app);

  // Add a route prefix
  nestApp.setGlobalPrefix('api');
  nestApp.enableCors();

  await nestApp.listen(3000);
}

bootstrap();
