import { ApiProperty } from '@nestjs/swagger';
import { CommonBaseQueryDto } from './common-base.dto';

export class CommonGetDto extends CommonBaseQueryDto {
    @ApiProperty()
    id: string;
}
