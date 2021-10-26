import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { schemasProviders } from 'src/schemas/base/providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CommonController],
  providers: [CommonService, ...schemasProviders],
})
export class CommonModule {}
