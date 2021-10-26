import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegistryDto } from './dtos/registry.dto';
import { createHash } from 'crypto';
import { AccountDocument } from 'src/schemas/account';
import { Model } from 'mongoose';
import { BusinessError } from 'src/infrastructure/response/business.error';
import { hashPassword } from 'src/utils/utils';
import * as lodash from 'lodash';

@Injectable({})
export class AuthService {
  constructor(
    @Inject('ACCOUNT_MODEL')
    private readonly accountModel: Model<AccountDocument>,
    private jwtService: JwtService,
  ) {}

  async validateAccount(username: string): Promise<any> {
    const account = await this.accountModel.findOne({ username });
    if (account && !account.archived) {
      return account;
    }
    return null;
  }

  async validatePassword(account: any, pass: string): Promise<any> {
    if (
      account &&
      account.hashedPassword === createHash('md5').update(pass).digest('hex')
    ) {
      return account;
    }
    return null;
  }

  async login(account: any) {
    const payload = {
      username: account.username,
      sub: account.id,
      authorizationFingerprint: this.generateAuthorizationFingerprint(account),
    };
    await account.populate('roles');

    await Promise.all(
      (account.roles || []).map(async (role) => {
        await role.populate('permissions');
      }),
    );
    const permissions = lodash.reduce(
      account.roles,
      (res, item) => res.concat(item.permissions),
      [],
    );
    await Promise.all(
      (permissions || []).map(async (permission) => {
        await permission.populate('resources');
      }),
    );

    const currentAuthority = lodash.map(
      lodash.reduce(
        permissions,
        (res, item) =>
          res.concat(lodash.filter(item.resources, (x) => x.type === 'Admin')),
        [],
      ),
      (x) => lodash.trim(x.identifier, '/').toLowerCase(),
    );

    return {
      accessToken: this.jwtService.sign(payload),
      currentAuthority,
    };
  }

  async registry(account: RegistryDto) {
    const existingAccount = await this.accountModel.findOne({
      username: account.username,
    });
    if (existingAccount) {
      throw new BusinessError('账号已经存在');
    }
    const newAccount = new this.accountModel({
      username: account.username,
      hashedPassword: hashPassword(account.password),
    });
    await newAccount.save();
    return newAccount;
  }

  async getAccount(id: string) {
    return await this.accountModel.findById(id);
  }

  async getResources(id: string, type: string) {
    const account = await this.accountModel.findById(id);
    await account.populate('roles');
    await Promise.all(
      (account.roles || []).map(async (role:any) => {
        await role.populate('permissions');
      }),
    );
    const permissions = lodash.reduce(
      account.roles,
      (res, item) => res.concat(item.permissions),
      [],
    );
    await Promise.all(
      (permissions || []).map(async (permission) => {
        await permission.populate('resources');
      }),
    );
    return lodash.map(
      lodash.reduce(
        permissions,
        (res, item) =>
          res.concat(
            lodash.filter(item.resources, (x) => !type || x.type === type),
          ),
        [],
      ),
      (x) => lodash.trim(x.identifier, '/').toLowerCase(),
    );
  }

  generateAuthorizationFingerprint(account: AccountDocument) {
    return createHash('md5')
      .update(
        account.hashedPassword +
          '|' +
          (account.roles || []).join(',') +
          '|' +
          account.archived +
          '|' +
          account.username,
      )
      .digest('hex');
  }
}
