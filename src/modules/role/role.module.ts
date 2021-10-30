import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Mongoose } from 'mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { RoleSchema } from 'src/schemas/role';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [
    RoleService,
    {
      provide: 'ROLE_MODEL',
      useFactory: (mongoose: Mongoose) => mongoose.model('Role', RoleSchema),
      inject: ['DATABASE_CONNECTION'],
    }
  ]
})
export class RoleModule { }
