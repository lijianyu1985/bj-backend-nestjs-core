import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { ClientDocument } from 'src/schemas/client';

@Injectable()
export class MiniProgramService {
  constructor(
    @Inject('CLIENT_MODEL')
    private readonly clientModel: Model<ClientDocument>,
    private jwtService: JwtService,
  ) {}

  async login(client: any) { 
    const payload = {
      wxNickName: client.wxNickName,
      wxOpenId: client.wxOpenId,
      wxSessionKey: client.wxSessionKey,
      sub: client.id,
    };
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    try {
      const result = this.jwtService.verify(token);
      return result;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async tryCreateClient(
    openId: string,
    nickName: string,
    avatarUrl: string,
    sessionKey: string,
  ) {
    return await this.clientModel.findOneAndUpdate(
      { wxOpenId: openId },
      {
        wxOpenId: openId,
        wxNickName: nickName,
        wxAvatarUrl: avatarUrl,
        wxSessionKey: sessionKey,
      },
      { upsert: true },
    );
  }
}
