import { ApiProperty } from '@nestjs/swagger';

export class MiniProgramLoginDto {
  @ApiProperty()
  code: string;
  @ApiProperty()
  avatarUrl: string;
  @ApiProperty()
  nickName: string;
}