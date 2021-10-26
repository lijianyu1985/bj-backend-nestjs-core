import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommonBaseDto } from './common-base.dto';

export class CommonUpdateDto extends CommonBaseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  @ApiPropertyOptional()
  data: any;
}
