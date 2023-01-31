import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, PaginateResult } from 'mongoose';
import { DefaultSort, PaginationDto } from '../constant/pagination';
import { STATUS_MSG } from '../constant/status-message.constants';
import {
  AddProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from './product.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    @InjectModel(Product.name)
    private readonly ProductModel: Model<ProductDocument>,
    @InjectModel(Product.name)
    private readonly ProductPage: PaginateModel<ProductDocument>,
  ) {}

  /**
   *
   * @param addProductDto.
   * @return Product
   * @description This function is creating a new ProductDocument.
   *
   */
  async create(addProductDto: AddProductDto): Promise<ProductDocument> {
    const Product = new this.ProductModel({
      ...addProductDto,
    });
    this.logger.debug(`creating Product: ${Product}`);
    return Product.save();
  }

  /**
   *
   * @param query.
   * @param paginateOptions
   * @return Product
   * @description This function is searching multiple Product records using a paginate query.
   *
   */
  async all(
    query: ProductQueryDto,
    paginateOptions: PaginationDto,
  ): Promise<PaginateResult<ProductDocument>> {
    const product = await this.ProductPage.paginate(
      { ...query },
      {
        sort: DefaultSort,
        lean: true,
        ...paginateOptions,
      },
    );
    return product;
  }

  /**
   *
   * @param id.
   * @return Product
   * @description This function is use for findById Product.
   *
   */
  async findById(id: string): Promise<ProductDocument> {
    const product = await (await this.ProductModel.findById({ _id: id }))
      .populated('category')
      .exec();
    if (!product) {
      this.logger.debug(`Product ${id} is not authorized `);
      throw new NotFoundException(STATUS_MSG.ERROR.RECORD_NOT_FOUND);
    }

    this.logger.debug(`find Product ${id}`);
    return product;
  }

  /**
   *
   * @param updateProductDto.
   * @return Product
   * @description This function is update ProductDocument.
   *
   */
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    const product = await this.ProductModel.findByIdAndUpdate(
      id,
      updateProductDto,
      {
        new: true,
      },
    );

    this.logger.debug(`updated this Product ${id}`);
    return product;
  }

  /**
   *
   * @param id.
   * @return Product
   * @description This function is delete ProductDocument.
   *
   */
  async delete(id: string): Promise<ProductDocument> {
    const product = await this.ProductModel.findByIdAndDelete({ _id: id });
    if (!product) {
      throw new NotFoundException(STATUS_MSG.ERROR.RECORD_NOT_FOUND);
    }
    this.logger.debug(`delete this ${id}`);
    return product;
  }
}
