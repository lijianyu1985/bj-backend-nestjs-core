import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateResourceDto {
  @ApiProperty()
  identifier: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  @ApiPropertyOptional()
  data: string;

  @ApiProperty()
  @ApiPropertyOptional()
  description: string;
}