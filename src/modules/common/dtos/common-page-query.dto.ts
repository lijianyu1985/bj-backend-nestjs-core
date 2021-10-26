import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CommonBaseQueryDto } from './common-base.dto';

export class CommonPageQueryDto extends CommonBaseQueryDto {
  @ApiProperty({
    type: Number,
    default: 1,
    required: true,
  })
  page: number;

  @ApiProperty({
    type: Number,
    default: 10,
  })
  size: number;

  @ApiProperty()
  @ApiPropertyOptional()
  sort: string;
}
