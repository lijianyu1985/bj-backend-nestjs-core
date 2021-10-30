import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}