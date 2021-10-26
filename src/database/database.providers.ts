import * as mongoose from 'mongoose';
import * as config from 'config';
import { ConnectOptions } from 'mongoose';

const uri = config.get('database.uri') as string;
const options = config.get('database.options') as ConnectOptions;

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        uri,
        options
      ),
  },
];
