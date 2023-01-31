import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';
import { Category } from '../category/category.schema';

export type ProductDocument = Product & Document;

/**
 *
 * @description This schema for work shop.
 * @schema @WorkShop
 *
 */
@Schema({ timestamps: true })
export class Product {
  @Prop({ type: String })
  productName: string;

  @Prop({ type: String })
  qtyPerUnit: string;

  @Prop({ type: String })
  unitPrice: string;

  @Prop({ type: String })
  unitInStock: string;

  @Prop({ type: String })
  discontinued: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.plugin(paginate);
