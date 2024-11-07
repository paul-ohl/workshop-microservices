import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from './category.schema';

@Schema()
export class Animal extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    age: number;

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    categoryId: Types.ObjectId;

    @Prop({ required: true, enum: [1, 2] })  
    gender: number;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
