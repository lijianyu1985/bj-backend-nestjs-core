import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as config from 'config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwt.secret'),
    });
  }

  async validate(payload: any) {
    const account = await this.authService.getAccount(payload.sub)
    if( this.authService.generateAuthorizationFingerprint(account) ===
    payload.authorizationFingerprint){
      return { userId: payload.sub, username: payload.username, authorizationFingerprint: payload.authorizationFingerprint };
    }
    return false;
  }
}
