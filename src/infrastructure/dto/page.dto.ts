import { ParseIntPipe } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PageQueryDto {
  @ApiProperty({
    type:Number,
    default: 1, 
    required: true
  })
  @IsNumber()
  page: number;
  @ApiProperty({
    type: Number,
    default: 10, 
  })
  size: number;

  @ApiProperty()
  @ApiPropertyOptional()
  query: string;
  @ApiProperty()
  @ApiPropertyOptional()
  sort: string;
  @ApiProperty()
  @ApiPropertyOptional()
  projection: string;
  @ApiProperty()
  @ApiPropertyOptional()
  population: string;
}
