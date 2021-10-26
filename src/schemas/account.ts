// //https://mongoosejs.com/docs/schematypes.html
// import { Schema } from 'mongoose';
// import { generateSchema } from './base/base';

// export const AccountSchema = generateSchema({
//   username: {
//     type: Schema.Types.String,
//   },
//   roles: [Schema.Types.String],
//   hashedPassword: {
//     type: Schema.Types.String,
//   },
//   name: {
//     type: Schema.Types.String,
//   },
//   phone: {
//     type: Schema.Types.String,
//   },
//   fingerPrint: {
//     type: Schema.Types.Number,
//     default: 0,
//   },
// });

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { BaseDocument } from './base/base.document';

export type AccountDocument = Account & Document;

@Schema({
  timestamps: {},
})
export class Account extends BaseDocument {
  @Prop()
  username: string;

  // @Prop()
  // roles: [string];

  @Prop({ type: [Types.ObjectId], ref: 'Role' })
  roles: Types.ObjectId[];

  @Prop()
  hashedPassword: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
