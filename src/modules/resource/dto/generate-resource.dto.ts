import { ApiProperty } from '@nestjs/swagger';

export class GenerateResourceDto {
  @ApiProperty()
  apiJson: string;
}