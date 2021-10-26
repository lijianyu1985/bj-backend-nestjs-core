import { ApiProperty } from '@nestjs/swagger';

export class RegistryDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
