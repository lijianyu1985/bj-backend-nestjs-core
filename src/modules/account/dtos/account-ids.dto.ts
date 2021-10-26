import { ApiProperty } from '@nestjs/swagger';

export class AccountIdsDto {
  @ApiProperty()
  ids: [string];
}
