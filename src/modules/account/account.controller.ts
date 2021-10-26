import {
  Controller,
  Request,
  Get,
  Query,
  Body,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AccountPageQueryDto } from './dtos/account-page-query.dto';
import { AccountService } from './account.service';
import { AccountChangePasswordDto } from './dtos/account-change-password.dto';
import { AccountChangeDto } from './dtos/account-change.dto';
import { AccountIdsDto } from './dtos/account-ids.dto';
import { AccountIdDto } from './dtos/account-id.dto';
import { AccountResetPasswordDto } from './dtos/account-reset-password.dto';
import { AccountProfileChangeDto } from './dtos/account-profile-change.dto';

@Controller('account')
@ApiTags('用户')
@ApiBearerAuth()
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    const account = await this.accountService.get(req.user.userId);
    return {
      id: account.id,
      username: account.username,
      roles: account.roles,
      name: account.name,
      phone: account.phone,
    };
  }

  @Get('page')
  @ApiQuery({
    name: 'query',
    description: '分页查询',
    type: AccountPageQueryDto,
  })
  async page(@Query() query) {
    return await this.accountService.page(query);
  }

  @Get('get')
  @ApiQuery({ name: 'id', description: 'ID', type: String })
  async get(@Query('id') id) {
    return await this.accountService.get(id);
  }

  @Post('resetPassword')
  @ApiBody({
    description: '重置密码',
    type: AccountResetPasswordDto,
  })
  async resetPassword(@Body('password') model) {
    return await this.accountService.updatePassword(model.id, model.password);
  }

  @Post('defaultPassword')
  @ApiBody({
    description: 'ID',
    type: AccountIdDto,
  })
  async defaultPassword(@Body() model) {
    return await this.accountService.defaultPassword(model.id);
  }

  @Post('changePassword')
  @ApiBody({
    description: '密码',
    type: AccountChangePasswordDto,
  })
  async changePassword(@Request() req, @Body() passwordModel) {
    return await this.accountService.changePassword(
      req.user.userId,
      passwordModel.oldPassword,
      passwordModel.newPassword,
    );
  }

  @Post('archive')
  @ApiBody({
    description: 'ID列表',
    type: AccountIdsDto,
  })
  async archive(@Body() model) {
    return await this.accountService.archive(model.ids);
  }

  @Post('unarchive')
  @ApiBody({
    description: 'ID列表',
    type: AccountIdsDto,
  })
  async unarchive(@Body() model) {
    return await this.accountService.unarchive(model.ids);
  }

  @Post('change')
  @ApiBody({
    description: '账户更新数据',
    type: AccountChangeDto,
  })
  async change(@Body() model) {
    return await this.accountService.change(model);
  }

  @Post('changeProfile')
  @ApiBody({
    description: '账户更新数据',
    type: AccountProfileChangeDto,
  })
  async changeProfile(@Request() req, @Body() model) {
    return await this.accountService.change({id: req.user.userId, ...model});
  }

  @Post('create')
  @ApiBody({
    description: '账户创建数据',
    type: AccountChangeDto,
  })
  async create(@Body() model) {
    return await this.accountService.create(model);
  }
}
