import { Get, Body, Delete, Query } from '@nestjs/common';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { BaseService } from './base.service';
import { DeleteBaseDto } from './dto/delete-base.dto';
import { FindQueryBaseDto } from './dto/find-query-base.dto';
import { GetBaseDto } from './dto/get-baes.dto';
import { PageQueryBaseDto } from './dto/page-query-base.dto';

export class BaseController<T> {
  constructor(private readonly commonService: BaseService<T>) { }

  @Get('page')
  @ApiQuery({
    name: 'query',
    description: '分页查询',
    type: PageQueryBaseDto,
  })
  async page(@Query() query: PageQueryBaseDto) {
    return await this.commonService.page(query);
  }

  @Get('find')
  @ApiQuery({
    name: 'query',
    description: '按条件查询',
    type: FindQueryBaseDto,
  })
  async find(@Query() query: FindQueryBaseDto) {
    console.log(query)
    return await this.commonService.find(query);
  }

  @Get('get')
  @ApiQuery({
    name: 'query',
    description: '根据ID查询',
    type: GetBaseDto,
  })
  async get(
    @Query() query
  ) {
    return await this.commonService.get(query);
  }

  @Delete('delete')
  @ApiBody({
    description: '要删除的Ids',
    type: DeleteBaseDto,
  })
  delete(@Body() model: DeleteBaseDto) {
    return this.commonService.archiveByIds(model,
    );
  }
}
