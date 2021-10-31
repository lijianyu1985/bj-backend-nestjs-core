import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseDocument } from './base/base.document';
import { CommonSchema } from './common/common-schema';

export type ClientDocument = Client & Document;

@Schema({
  ...CommonSchema,
})
export class Client extends BaseDocument {
  @Prop()
  wxOpenId: string;

  @Prop()
  wxNickName: string;

  @Prop()
  wxAvatarUrl: string;

  @Prop()
  wxSessionKey: string;

  @Prop()
  name: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
