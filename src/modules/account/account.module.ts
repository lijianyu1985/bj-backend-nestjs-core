import { Module } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { AccountSchema } from 'src/schemas/account';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController],
  providers: [
    AccountService,
    {
      provide: 'ACCOUNT_MODEL',
      useFactory: (mongoose: Mongoose) =>
        mongoose.model('Account', AccountSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
})
export class AccountModule {}
