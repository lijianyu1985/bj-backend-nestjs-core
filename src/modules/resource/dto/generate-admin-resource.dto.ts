import { ApiProperty } from '@nestjs/swagger';

export class GenerateAdminResourceDto {
  @ApiProperty()
  adminRoutes: string;
}
