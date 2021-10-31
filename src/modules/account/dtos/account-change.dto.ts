import { ApiProperty } from '@nestjs/swagger';

export class AccountChangeDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  roles: [string];
  @ApiProperty()
  avatarUrl: string;
}
