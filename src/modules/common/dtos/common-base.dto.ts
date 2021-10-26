import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CommonBaseDto {
  @ApiProperty()
  modelName: string;
}

export class CommonBaseQueryDto extends CommonBaseDto {
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
