import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { BaseDocument } from './base/base.document';
import { CommonSchema } from './common/common-schema';

export type TodoDocument = Todo & Document;

@Schema({
  ...CommonSchema,
})
export class Todo extends BaseDocument {
  @Prop(SchemaTypes.String)
  name: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
