import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}