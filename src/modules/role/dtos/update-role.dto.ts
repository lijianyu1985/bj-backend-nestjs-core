import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  permissions: [string];

  @ApiProperty()
  @ApiPropertyOptional()
  description: string;
}
