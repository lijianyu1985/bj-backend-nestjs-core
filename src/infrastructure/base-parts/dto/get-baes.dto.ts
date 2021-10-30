import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetBaseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    @ApiPropertyOptional()
    projection: string;

    @ApiProperty()
    @ApiPropertyOptional()
    population: string;
}
