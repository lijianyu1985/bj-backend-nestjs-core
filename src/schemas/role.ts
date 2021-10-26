import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseDocument } from './base/base.document';

export type RoleDocument = Role & Document;

@Schema({
  timestamps: {},
})
export class Role extends BaseDocument {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'Permission' })
  permissions: Types.ObjectId[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
