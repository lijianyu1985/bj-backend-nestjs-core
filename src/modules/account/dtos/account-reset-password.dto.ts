import { ApiProperty } from '@nestjs/swagger';

export class AccountResetPasswordDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  password: string;
}
