import { Mongoose } from 'mongoose';
import { AccountSchema } from '../account';
import { ClientSchema } from '../client';
import { PermissionSchema } from '../permission';
import { ResourceSchema } from '../resource';
import { RoleSchema } from '../role';
import { TodoSchema } from '../todo';

export const schemasProviders = [
  {
    provide: 'ACCOUNT_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Account', AccountSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'CLIENT_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Client', ClientSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'RESOURCE_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Resource', ResourceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'PERMISSION_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Permission', PermissionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ROLE_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Role', RoleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'TODO_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Todo', TodoSchema),
    inject: ['DATABASE_CONNECTION'],
  }, 
];
