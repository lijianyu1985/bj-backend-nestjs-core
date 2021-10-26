//https://mongoosejs.com/docs/schematypes.html
import { Schema } from 'mongoose';

export const generateSchema = (model: any) => {
  return new Schema(
    Object.assign(
      {
        archived: {
          type: Schema.Types.Boolean,
          default: false,
        },
      },
      model,
    ),
    {
      timestamps: {},
    },
  );
};
