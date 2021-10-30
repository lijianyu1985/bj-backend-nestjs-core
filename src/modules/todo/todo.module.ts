import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { Mongoose } from 'mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { TodoSchema } from 'src/schemas/todo';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [
    TodoService,
    {
      provide: 'TODO_MODEL',
      useFactory: (mongoose: Mongoose) => mongoose.model('Todo', TodoSchema),
      inject: ['DATABASE_CONNECTION'],
    }
  ]
})
export class TodoModule { }
