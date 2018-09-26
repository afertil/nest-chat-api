import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {
  NestMiddleware,
  MiddlewareFunction
} from '@nestjs/common/interfaces/middlewares';
import * as multer from 'multer';
import * as path from 'path';

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
  resolve() {
    return (req, res, next) => {
      const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads/images');
        },
        filename: (req, file, cb) => {
          cb(
            null,
            `${file.fieldname}-${Date.now()}${path
              .extname(file.originalname)
              .toLowerCase()}`
          );
        }
      });

      function imageFilter(request, file, cb) {
        // accept image only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
          return cb('Only image files are allowed!', false);
        }
        cb(null, true);
      }

      const upload = multer({
        storage: storage,
        fileFilter: imageFilter
      }).any();
      req.upload = upload;

      next();
    };
  }
}
