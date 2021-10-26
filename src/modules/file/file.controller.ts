import {
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import multer = require('multer');
import { join } from 'path';
import { v4 } from 'uuid';
import { Public } from '../auth/strategies/auth-public.decorator';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, v4() + '-' + file.originalname);
  },
});

@Controller('file')
@ApiTags('文件')
@ApiBearerAuth()
export class FileController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: storage,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @Get('download')
  @Public()
  async getFile(@Query('filename') filename: string, @Res() res: Response) {
    const file = createReadStream(
      join(process.cwd(), 'public/uploads/', filename),
    );
    file.pipe(res);
  }
}
