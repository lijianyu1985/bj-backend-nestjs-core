import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BusinessError } from 'src/infrastructure/response/business.error';
import { Public } from '../auth/strategies/auth-public.decorator';
import { MiniProgramCustomAuthGuard } from './auth/miniprogram-custom-auth.guard';
import { CheckTokenDto } from './dto/check-token.dto';
import { MiniProgramLoginDto } from './dto/miniprogram-login-dto';
import { MiniProgramService } from './miniprogram.service';

@Controller('miniprogram')
@ApiTags('微信小程序')
export class MiniProgramController {
  constructor(private readonly miniProgramService: MiniProgramService) {}

  @Post('checkToken')
  @Public()
  @ApiBody({
    description: 'ID列表',
    type: CheckTokenDto,
  })
  async checkToken(@Body('token') token) {
    if (await this.miniProgramService.verifyToken(token)) {
      return { token };
    }
    throw new BusinessError('token验证失败');
  }

  @Public()
  @UseGuards(MiniProgramCustomAuthGuard)
  @Post('login')
  @ApiBody({ description: '登录参数', type: MiniProgramLoginDto })
  async login(@Request() req) {
    return {
      session_key: req.user.wxSessionKey,
      openid: req.user.wxOpenId,
      token: await this.miniProgramService.login(req.user),
      uid: req.user.id,
    };
  }
}
