import { Controller, Body, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/infrastructure/base-parts/base.controller';
import { PermissionDocument } from '../../schemas/permission';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { UpdatePermissionDto } from './dtos/update-permission.dto';

@Controller('permission')
@ApiTags('Permission')
@ApiBearerAuth()
export class PermissionController extends BaseController<PermissionDocument> {
  constructor(private permissionService: PermissionService) {
    super(permissionService);
  }

  @Post('create')
  @ApiBody({
    description: '创建',
    type: CreatePermissionDto,
  })
  async create(@Body() model: CreatePermissionDto) {
    return await this.permissionService.insert(model);
  }

  @Post('update')
  @ApiBody({
    description: '更新',
    type: UpdatePermissionDto,
  })
  async update(@Body() model: UpdatePermissionDto) {
    const { id, ...data } = model;
    return await this.permissionService.updateById(id, data);
  }
}
