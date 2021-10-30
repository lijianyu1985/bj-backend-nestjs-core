import { Controller, Body, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/infrastructure/base-parts/base.controller';
import { TodoDocument } from '../../schemas/todo';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Controller('todo')
@ApiTags('Todo')
@ApiBearerAuth()
export class TodoController extends BaseController<TodoDocument> {
  constructor(private todoService: TodoService) {
    super(todoService);
  }

  @Post('create')
  @ApiBody({
    description: '创建',
    type: CreateTodoDto,
  })
  async create(@Body() model: CreateTodoDto) {
    return await this.todoService.insert(model);
  }

  @Post('update')
  @ApiBody({
    description: '更新',
    type: UpdateTodoDto,
  })
  async update(@Body() model: UpdateTodoDto) {
    const { id, ...data } = model;
    return await this.todoService.updateById(id, data);
  }
}
