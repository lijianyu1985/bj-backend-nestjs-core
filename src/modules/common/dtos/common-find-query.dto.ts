import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommonBaseQueryDto } from './common-base.dto';

export class CommonFindQueryDto extends CommonBaseQueryDto {
  @ApiProperty()
  @ApiPropertyOptional()
  query: string;
}
