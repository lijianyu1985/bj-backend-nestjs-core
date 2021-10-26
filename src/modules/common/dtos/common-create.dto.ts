import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommonBaseDto } from './common-base.dto';

export class CommonCreateDto extends CommonBaseDto {
  @ApiProperty()
  @ApiPropertyOptional()
  data: any;
}
