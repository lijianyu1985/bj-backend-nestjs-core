import { ApiProperty } from '@nestjs/swagger';

export class AccountProfileChangeDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  phone: [string];
}
