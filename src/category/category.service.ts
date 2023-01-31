import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, PaginateResult } from 'mongoose';
import { PaginationDto, DefaultSort } from '../constant/pagination';
import { STATUS_MSG } from '../constant/status-message.constants';
import {
  AddCategoryDto,
  CategoryQueryDto,
  UpdateCategoryDto,
} from './category.dto';
import { Category, CategoryDocument } from './category.schema';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  constructor(
    @InjectModel(Category.name)
    private readonly CategoryModel: Model<CategoryDocument>,
    @InjectModel(Category.name)
    private readonly CategoryPage: PaginateModel<CategoryDocument>,
  ) {}

  /**
   *
   * @param addCategoryDto.
   * @return Category
   * @description This function is creating a new CategoryDocument.
   *
   */
  async create(addCategoryDto: AddCategoryDto): Promise<CategoryDocument> {
    const category = new this.CategoryModel({
      ...addCategoryDto,
    });
    this.logger.debug(`creating Category: ${category}`);
    return category.save();
  }

  /**
   *
   * @param query.
   * @param paginateOptions
   * @return Category
   * @description This function is searching multiple Category records using a paginate query.
   *
   */
  async all(
    query: CategoryQueryDto,
    paginateOptions: PaginationDto,
  ): Promise<PaginateResult<CategoryDocument>> {
    const category = await this.CategoryPage.paginate(
      { ...query },
      {
        sort: DefaultSort,
        lean: true,
        ...paginateOptions,
      },
    );
    return category;
  }

  /**
   *
   * @param id.
   * @return Category
   * @description This function is use for findById Category.
   *
   */
  async findById(id: string): Promise<CategoryDocument> {
    const category = await this.CategoryModel.findById({ _id: id });
    if (!category) {
      this.logger.debug(`Category ${id} is not authorized `);
      throw new NotFoundException(STATUS_MSG.ERROR.RECORD_NOT_FOUND);
    }

    this.logger.debug(`find Category ${id}`);
    return category;
  }

  /**
   *
   * @param updateCategoryDto.
   * @return Category
   * @description This function is update CategoryDocument.
   *
   */
  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDocument> {
    const category = await this.CategoryModel.findByIdAndUpdate(
      id,
      updateCategoryDto,
      {
        new: true,
      },
    );

    this.logger.debug(`updated this Category ${id}`);
    return category;
  }

  /**
   *
   * @param id.
   * @return Category
   * @description This function is delete CategoryDocument.
   *
   */
  async delete(id: string): Promise<CategoryDocument> {
    const category = await this.CategoryModel.findByIdAndDelete({ _id: id });
    if (!category) {
      throw new NotFoundException(STATUS_MSG.ERROR.RECORD_NOT_FOUND);
    }
    this.logger.debug(`delete this ${id}`);
    return category;
  }
}
