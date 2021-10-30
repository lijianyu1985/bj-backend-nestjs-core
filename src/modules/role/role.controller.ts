import { Controller, Body, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/infrastructure/base-parts/base.controller';
import { RoleDocument } from '../../schemas/role';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Controller('role')
@ApiTags('Role')
@ApiBearerAuth()
export class RoleController extends BaseController<RoleDocument> {
  constructor(private roleService: RoleService) {
    super(roleService);
  }

  @Post('create')
  @ApiBody({
    description: '创建',
    type: CreateRoleDto,
  })
  async create(@Body() model: CreateRoleDto) {
    return await this.roleService.insert(model);
  }

  @Post('update')
  @ApiBody({
    description: '更新',
    type: UpdateRoleDto,
  })
  async update(@Body() model: UpdateRoleDto) {
    const { id, ...data } = model;
    return await this.roleService.updateById(id, data);
  }
}
