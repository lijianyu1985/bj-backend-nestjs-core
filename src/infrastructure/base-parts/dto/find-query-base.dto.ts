import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FindQueryBaseDto {
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
