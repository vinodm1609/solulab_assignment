import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddProductDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  qtyPerUnit: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  unitInStock: string;

  @ApiProperty({ type: Boolean })
  @IsNotEmpty()
  @IsBoolean()
  discontinued: boolean;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsMongoId({ each: true })
  @IsString()
  category?: string;
}

export class ProductQueryDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  productName?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsMongoId({ each: true })
  @IsString()
  category?: string;
}

export class UpdateProductDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  productName?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  qtyPerUnit?: string;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsString()
  unitPrice?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  unitInStock?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsBoolean()
  discontinued?: boolean;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsMongoId({ each: true })
  @IsString()
  category?: string;
}
