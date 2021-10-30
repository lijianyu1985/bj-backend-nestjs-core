import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseService } from 'src/infrastructure/base-parts/base.service';
import { TodoDocument } from 'src/schemas/todo';

export class TodoService extends BaseService<TodoDocument> {
  constructor(
    @Inject('TODO_MODEL')
    private readonly todoModel: Model<TodoDocument>,) {
    super(todoModel);
  }
}
