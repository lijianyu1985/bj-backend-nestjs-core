import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { BusinessError } from 'src/infrastructure/response/business.error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    let account = await this.authService.validateAccount(username);
    if (!account) {
      throw new BusinessError('用户不存在');
    }
    account = await this.authService.validatePassword(account, password);
    if (!account) {
      throw new BusinessError('密码错误');
    }
    return account;
  }
}
