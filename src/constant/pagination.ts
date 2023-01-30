import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';
import { ToBoolean } from '../helper/custom.validators';

/**
 *
 * @description Creating for pagination Dto and set page and limit default value.
 * @dto PaginationDto.
 *
 */
export class PaginationDto {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({ default: 1 })
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({ default: 10 })
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @ApiPropertyOptional({ default: true })
  @ToBoolean()
  @IsBoolean()
  @Type(() => Boolean)
  pagination?: boolean;
}
// sort by id in pagination
export const DefaultSort = { _id: -1 };
