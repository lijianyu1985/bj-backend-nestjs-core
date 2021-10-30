import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { GenerateResourceDto } from './dto/generate-resource.dto';
import { ResourceService } from './resource.service';
import {keys, trim} from 'lodash'
import { GenerateAdminResourceDto } from './dto/generate-admin-resource.dto';
import { BaseController } from 'src/infrastructure/base-parts/base.controller';
import { ResourceDocument } from 'src/schemas/resource';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Controller('resource')
export class ResourceController extends BaseController<ResourceDocument> {
  constructor(private resourceService: ResourceService) {
    super(resourceService);
  }

  @Post('create')
  @ApiBody({
    description: '创建',
    type: CreateResourceDto,
  })
  async create(@Body() model: CreateResourceDto) {
    return await this.resourceService.insert(model);
  }

  @Post('update')
  @ApiBody({
    description: '更新',
    type: UpdateResourceDto,
  })
  async update(@Body() model: UpdateResourceDto) {
    const { id, ...data } = model;
    return await this.resourceService.updateById(id, data);
  }

  @Post('generateApi')
  @ApiBody({
    description: 'API资源数据',
    type: GenerateResourceDto,
  })
  async generateApi(@Body() model) {
    return await this.resourceService.generateApiResources(keys(JSON.parse(model.apiJson).paths).map(x=>trim(x.toLowerCase(),'/')))
  }

  @Post('generateAdmin')
  @ApiBody({
    description: 'Admin资源数据',
    type: GenerateAdminResourceDto,
  })
  async generateAdmin(@Body() model) {
    return await this.resourceService.generateAdminResources(JSON.parse(model.adminRoutes))
  }
}
