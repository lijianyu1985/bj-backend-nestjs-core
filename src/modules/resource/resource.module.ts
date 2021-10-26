import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Mongoose } from 'mongoose';
import { ResourceSchema } from 'src/schemas/resource';

@Module({
  imports: [DatabaseModule],
  controllers: [ResourceController],
  providers: [
    {
      provide: 'RESOURCE_MODEL',
      useFactory: (mongoose: Mongoose) =>
        mongoose.model('Resource', ResourceSchema),
      inject: ['DATABASE_CONNECTION'],
    },
    ResourceService,
  ],
})
export class ResourceModule {}
