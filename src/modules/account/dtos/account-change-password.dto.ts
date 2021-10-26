import { ApiProperty } from '@nestjs/swagger';

export class AccountChangePasswordDto {
  @ApiProperty()
  oldPassword: string;
  @ApiProperty()
  newPassword: string;
}
