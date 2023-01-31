import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginateResult } from 'mongoose';
import { PaginationDto } from '../constant/pagination';
import { STATUS_MSG } from '../constant/status-message.constants';
import {
  AddProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from './product.dto';
import { ProductDocument } from './product.schema';
import { ProductService } from './product.service';
@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /**
   *
   * @param addProductDto
   * @returns Product
   * @description this APi create new Product
   *
   */
  @Post()
  async create(
    @Body()
    addProductDto: AddProductDto,
  ): Promise<ProductDocument> {
    return this.productService.create(addProductDto);
  }

  /**
   *
   * @param query
   * @param paginateOptions
   * @returns  Product
   * @description Multiple Product can be found using this API.
   *
   */
  @Get()
  async all(
    @Query() query: ProductQueryDto,
    @Query() paginateOptions: PaginationDto,
  ): Promise<PaginateResult<ProductDocument>> {
    return await this.productService.all(query, paginateOptions);
  }

  /**
   *
   * @param id
   * @returns Product
   * @description Find Product by Id using this APi
   *
   */
  @Get('/:id')
  async fetch(@Param('id') id: string): Promise<ProductDocument> {
    return await this.productService.findById(id);
  }

  /**
   *
   * @param id
   * @param updateAppConfigDto
   * @returns Product
   * @description This API is utilized to find and updated Product details.
   *
   */
  @Put(`/:id`)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    return await this.productService.update(id, updateProductDto);
  }

  /**
   *
   * @param id
   * @returns delete id
   * @description This API is utilized to find and delete id.
   *
   */
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<any> {
    const deleted = await this.productService.delete(id);
    if (deleted) {
      return STATUS_MSG.SUCCESS.DELETED;
    }
    throw new InternalServerErrorException(STATUS_MSG.ERROR.SERVER_ERROR);
  }
}
