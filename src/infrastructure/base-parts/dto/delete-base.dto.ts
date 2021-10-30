import { ApiProperty } from '@nestjs/swagger';

export class DeleteBaseDto  {
  @ApiProperty()
  ids: [string];
}
