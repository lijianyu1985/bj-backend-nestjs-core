import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './modules/auth/strategies/auth-public.decorator';

@Controller()
@ApiBearerAuth()
export class AppController {
  @Get()
  @Public()
  get(): string {
    return 'hello nestjs';
  }
}
