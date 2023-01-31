import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';

export type CategoryDocument = Category & Document;

/**
 *
 * @description This schema for work shop.
 * @schema @WorkShop
 *
 */
@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String })
  categoryName: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.plugin(paginate);
