import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MiniProgramAuthGuard extends AuthGuard('wechat') {}
