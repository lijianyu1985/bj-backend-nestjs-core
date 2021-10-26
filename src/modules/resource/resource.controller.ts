import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { GenerateResourceDto } from './dto/generate-resource.dto';
import { ResourceService } from './resource.service';
import {keys, trim} from 'lodash'
import { GenerateAdminResourceDto } from './dto/generate-admin-resource.dto';

@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

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
