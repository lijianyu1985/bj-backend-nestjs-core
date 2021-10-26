import { ApiProperty } from '@nestjs/swagger';
import { CommonBaseDto } from './common-base.dto';

export class CommonDeleteDto extends CommonBaseDto {
  @ApiProperty()
  ids: [string];
}
