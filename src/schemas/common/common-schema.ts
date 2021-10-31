export const CommonSchema = {
  timestamps: {},
  toJSON: {
    transform: (_, obj) => {
      obj.id = obj._id.toString();
      delete obj._id;
      delete obj.__v;
    },
  },
};
