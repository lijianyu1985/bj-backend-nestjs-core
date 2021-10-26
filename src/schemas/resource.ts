import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseDocument } from './base/base.document';

export type ResourceDocument = Resource & Document;

@Schema({
  timestamps: {},
})
export class Resource extends BaseDocument {
  @Prop()
  identifier: string;

  @Prop()
  type: string;

  @Prop()
  data: string;

  @Prop()
  description: string;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
