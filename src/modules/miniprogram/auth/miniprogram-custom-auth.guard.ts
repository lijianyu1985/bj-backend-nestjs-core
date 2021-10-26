import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MiniProgramCustomAuthGuard extends AuthGuard('miniprogram') {}
