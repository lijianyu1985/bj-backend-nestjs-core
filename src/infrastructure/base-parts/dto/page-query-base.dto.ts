import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PageQueryBaseDto {
  @ApiProperty({
    type: Number,
    default: 1,
  })
  @ApiPropertyOptional()
  page: number;

  @ApiProperty({
    type: Number,
    default: 10,
  })
  @ApiPropertyOptional()
  size: number;

  @ApiProperty()
  @ApiPropertyOptional()
  sort: string;

  @ApiProperty()
  @ApiPropertyOptional()
  query: string;

  @ApiProperty()
  @ApiPropertyOptional()
  projection: string;

  @ApiProperty()
  @ApiPropertyOptional()
  population: string;
}
