import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  permissions: [string];

  @ApiProperty()
  @ApiPropertyOptional()
  description: string;
}