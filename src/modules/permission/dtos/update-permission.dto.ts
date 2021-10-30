import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePermissionDto {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  name: string;

  @ApiProperty()
  resources: [string];

  @ApiProperty()
  @ApiPropertyOptional()
  description: string;
}