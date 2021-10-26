import { ApiProperty } from '@nestjs/swagger';

export class AccountIdDto {
  @ApiProperty()
  id: string;
}
