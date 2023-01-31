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
  AddCategoryDto,
  CategoryQueryDto,
  UpdateCategoryDto,
} from './category.dto';
import { CategoryDocument } from './category.schema';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   *
   * @param addCategoryDto
   * @returns Category
   * @description this APi create new Category
   *
   */
  @Post()
  async create(
    @Body()
    addCategoryDto: AddCategoryDto,
  ): Promise<CategoryDocument> {
    return this.categoryService.create(addCategoryDto);
  }

  /**
   *
   * @param query
   * @param paginateOptions
   * @returns  Category
   * @description Multiple Category can be found using this API.
   *
   */
  @Get()
  async all(
    @Query() query: CategoryQueryDto,
    @Query() paginateOptions: PaginationDto,
  ): Promise<PaginateResult<CategoryDocument>> {
    return await this.categoryService.all(query, paginateOptions);
  }

  /**
   *
   * @param id
   * @returns Category
   * @description Find Category by Id using this APi
   *
   */
  @Get('/:id')
  async fetch(@Param('id') id: string): Promise<CategoryDocument> {
    return await this.categoryService.findById(id);
  }

  /**
   *
   * @param id
   * @param updateAppConfigDto
   * @returns Category
   * @description This API is utilized to find and updated Category details.
   *
   */
  @Put(`/:id`)
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    return await this.categoryService.update(id, updateCategoryDto);
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
    const deleted = await this.categoryService.delete(id);
    if (deleted) {
      return STATUS_MSG.SUCCESS.DELETED;
    }
    throw new InternalServerErrorException(STATUS_MSG.ERROR.SERVER_ERROR);
  }
}
