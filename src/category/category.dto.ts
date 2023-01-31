import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddCategoryDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  categoryName: string;
}

export class CategoryQueryDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  categoryName?: string;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  categoryName?: string;
}
