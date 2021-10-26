import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MiniProgramStrategy } from './auth/wechat.strategy';
import { MiniProgramController } from './miniprogram.controller';
import { MiniProgramService } from './miniprogram.service';
import * as config from 'config';
import { JwtModule } from '@nestjs/jwt';
import { MiniProgramCustomStrategy } from './auth/miniprogram-custom.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { Mongoose } from 'mongoose';
import { ClientSchema } from 'src/schemas/client';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret: config.get('jwt.secret'),
      signOptions: { expiresIn: config.get('jwt.expiresIn') },
    }),
  ],
  controllers: [MiniProgramController],
  providers: [MiniProgramService, MiniProgramStrategy, MiniProgramCustomStrategy,
    {
      provide: 'CLIENT_MODEL',
      useFactory: (mongoose: Mongoose) => mongoose.model('Client', ClientSchema),
      inject: ['DATABASE_CONNECTION'],
    },],
})
export class MiniProgramModule {}
