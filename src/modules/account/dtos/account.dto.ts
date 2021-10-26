import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  name: string;
}
