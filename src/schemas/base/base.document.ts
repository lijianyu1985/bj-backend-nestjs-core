import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: {},
})
export class BaseDocument {
  @Prop()
  archived: boolean;
}
