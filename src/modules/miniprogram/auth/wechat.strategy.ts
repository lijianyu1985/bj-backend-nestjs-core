import { Strategy } from 'passport-wechat';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { BusinessError } from 'src/infrastructure/response/business.error';
import { MiniProgramService } from '../miniprogram.service';
import * as config from 'config';

@Injectable()
export class MiniProgramStrategy extends PassportStrategy(Strategy, 'wechat') {
  constructor(private miniProgramService: MiniProgramService) {
    super({
      appID: config.get('wxConfig.appId'),
      appSecret: config.get('wxConfig.appSecret'),
    });
  }

  async validate(...args): Promise<any> {
    console.log(args)
    return { _id: 1 };
  }
}
