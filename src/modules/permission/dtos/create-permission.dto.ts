import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  resources: [string];

  @ApiProperty()
  @ApiPropertyOptional()
  description: string;
}