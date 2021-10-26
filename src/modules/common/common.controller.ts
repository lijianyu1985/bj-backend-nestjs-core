import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CommonService } from './common.service';
import { CommonBaseQueryDto } from './dtos/common-base.dto';
import { CommonCreateDto } from './dtos/common-create.dto';
import { CommonDeleteDto } from './dtos/common-delete-dto';
import { CommonFindQueryDto } from './dtos/common-find-query.dto';
import { CommonGetDto } from './dtos/common-get.dto';
import { CommonPageQueryDto } from './dtos/common-page-query.dto';
import { CommonUpdateDto } from './dtos/common-update.dto';

@Controller('common')
@ApiTags('通用')
@ApiBearerAuth()
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @ApiQuery({
    name: 'model',
    description: '查询参数',
    type: CommonBaseQueryDto,
  })
  @Get('all')
  async findAll(@Query() model) {
    return await this.commonService.all(model);
  }

  @Get('page')
  @ApiQuery({
    name: 'query',
    description: '分页查询',
    type: CommonPageQueryDto,
  })
  async page(@Query() query) {
    return await this.commonService.page(query);
  }

  @Get('find')
  @ApiQuery({
    name: 'query',
    description: '按条件查询',
    type: CommonFindQueryDto,
  })
  async find(@Query() query) {
    return await this.commonService.find(query);
  }

  @Get('get')
  @ApiQuery({
    name: 'model',
    description: '根据ID查询',
    type: CommonGetDto,
  })
  async get(
    @Query('id') id,
    @Query('modelName') modelName,
    @Query('projection') projection,
    @Query('population') population,
  ) {
    return await this.commonService.get(modelName, id, projection, population);
  }

  @Post('create')
  @ApiBody({
    description: '创建',
    type: CommonCreateDto,
  })
  async create(@Body() model) {
    return await this.commonService.insert(model.modelName, model.data);
  }

  @Post('update')
  @ApiBody({
    description: '数据',
    type: CommonUpdateDto,
  })
  async update(@Body() model) {
    return await this.commonService.updateById(
      model.modelName,
      model.id,
      model.data,
    );
  }

  @Delete('delete')
  @ApiBody({
    description: '数据',
    type: CommonDeleteDto,
  })
  delete(@Body() model) {
    return this.commonService.archiveByIds(
      model.modelName,
      Array.isArray(model.ids) ? model.ids : [model.ids],
    );
  }
}
