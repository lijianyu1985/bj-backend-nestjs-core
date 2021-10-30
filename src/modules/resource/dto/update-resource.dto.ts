import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateResourceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  @ApiPropertyOptional()
  data: string;

  @ApiProperty()
  @ApiPropertyOptional()
  description: string;
}