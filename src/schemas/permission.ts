import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseDocument } from './base/base.document';

export type PermissionDocument = Permission & Document;

@Schema({
  timestamps: {},
})
export class Permission extends BaseDocument {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'Resource' })
  resources: Types.ObjectId[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
