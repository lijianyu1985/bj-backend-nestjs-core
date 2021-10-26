import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { BusinessError } from 'src/infrastructure/response/business.error';
import { MiniProgramService } from '../miniprogram.service';
import * as config from 'config';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import * as https from 'https';

@Injectable()
export class MiniProgramCustomStrategy extends PassportStrategy(
  Strategy,
  'miniprogram',
) {
  constructor(private miniProgramService: MiniProgramService) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const res = (await code2Session(req.body.code)) as any;
    if (res.errcode) {
      throw new BusinessError(JSON.stringify(res));
    }
    
    const client = await this.miniProgramService.tryCreateClient(
      res.openid,
      req.body.nickName,
      req.body.avatarUrl,
      res.session_key
    ) as any;
    return client;
  }
}

export async function code2Session(code) {
  const appId = config.get('wxConfig.appId');
  const appSecret = config.get('wxConfig.appSecret');
  const appCode2SessionUrl = 'https://api.weixin.qq.com/sns/jscode2session';
  const myURL = new URL(appCode2SessionUrl);
  myURL.searchParams.append('appid', appId);
  myURL.searchParams.append('secret', appSecret);
  myURL.searchParams.append('js_code', code);
  myURL.searchParams.append('grant_type', 'authorization_code');
  try {
    return new Promise((resolve, reject) => {
      https
        .get(myURL.href, (res) => {
          const { statusCode } = res;
          let error;
          // Any 2xx status code signals a successful response but
          // here we're only checking for 200.
          if (statusCode !== 200) {
            error = new BusinessError(
              'Request Failed.\n' + `Status Code: ${statusCode}`,
            );
          }
          if (error) {
            console.error(error.message);
            // Consume response data to free up memory
            res.resume();
            reject(error);
            return;
          }

          res.setEncoding('utf8');
          let rawData = '';
          res.on('data', (chunk) => {
            rawData += chunk;
          });
          res.on('end', () => {
            try {
              const parsedData = JSON.parse(rawData);
              resolve(parsedData);
            } catch (e) {
              console.error(e.message);
              reject(e);
            }
          });
        })
        .on('error', (e) => {
          console.error(`Got error: ${e.message}`);
          reject(e);
        });
    });
  } catch (err) {
    console.log(err);
    throw new BusinessError(err.message);
  }
}
