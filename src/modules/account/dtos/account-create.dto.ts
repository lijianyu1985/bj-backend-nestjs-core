import { ApiProperty } from '@nestjs/swagger';

export class AccountCreateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  roles: [string];
}
