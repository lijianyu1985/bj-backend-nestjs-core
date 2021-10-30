import {
  Controller,
  Request,
  Get,
  Post,
  Req,
  UseGuards,
  Body,
} from '@nestjs/common';
import { Public } from './strategies/auth-public.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './strategies/local-auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { RegistryDto } from './dtos/registry.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ description: '登录参数', type: LoginDto })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('registry')
  @ApiBody({ description: '注册参数', type: RegistryDto })
  async registry(@Request() req) {
    return this.authService.registry(req.body);
  }

  @Get('verifyToken')
  @ApiBearerAuth()
  async verifyToken(@Request() req) {
    if (req.user.userId) {
      return true;
    }
    return false;
  }
}
