import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import * as config from 'config';
import { Mongoose } from 'mongoose';
import { AccountSchema } from 'src/schemas/account';
import { DatabaseModule } from 'src/database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.register({
      secret:  config.get('jwt.secret'),
      signOptions: { expiresIn: config.get('jwt.expiresIn') },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy,
    {
      provide: 'ACCOUNT_MODEL',
      useFactory: (mongoose: Mongoose) => mongoose.model('Account', AccountSchema),
      inject: ['DATABASE_CONNECTION'],
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
