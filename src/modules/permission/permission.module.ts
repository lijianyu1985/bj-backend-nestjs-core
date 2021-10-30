import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { Mongoose } from 'mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { PermissionSchema } from 'src/schemas/permission';

@Module({
  imports: [DatabaseModule],
  controllers: [PermissionController],
  providers: [
    PermissionService,
    {
      provide: 'PERMISSION_MODEL',
      useFactory: (mongoose: Mongoose) =>
        mongoose.model('Permission', PermissionSchema),
      inject: ['DATABASE_CONNECTION'],
    },
  ],
})
export class PermissionModule {}
