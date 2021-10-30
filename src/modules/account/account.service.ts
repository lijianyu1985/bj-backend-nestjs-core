import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { isJSON, hashPassword } from 'src/utils/utils';
import { AccountDocument } from 'src/schemas/account';
import { BusinessError } from 'src/infrastructure/response/business.error';
import { BaseService } from 'src/infrastructure/base-parts/base.service';

@Injectable({})
export class AccountService  extends BaseService<AccountDocument> {
  constructor(
    @Inject('ACCOUNT_MODEL')
    private readonly accountModel: Model<AccountDocument>,) {
    super(accountModel);
  }

  async updateRoles(id: string, roleIds: [string]) {
    return await this.accountModel.findByIdAndUpdate(
      id,
      {
        roles: (roleIds || []).map((x) => new Types.ObjectId(x)),
      },
      { new: true },
    );
  }

  async updatePassword(id: string, password: string) {
    return await this.accountModel.findByIdAndUpdate(
      id,
      { hashedPassword: hashPassword(password) },
      { new: true },
    );
  }

  async defaultPassword(id: string) {
    return await this.accountModel.findByIdAndUpdate(
      id,
      { hashedPassword: hashPassword('Li@12345678') },
      { new: true },
    );
  }

  async changePassword(id: string, oldPassword: string, newPassword: string) {
    const account = await this.accountModel.findById(id);
    if (hashPassword(oldPassword) !== account.hashedPassword) {
      throw new BusinessError('旧密码错误');
    }
    return await this.accountModel.findByIdAndUpdate(
      id,
      { hashedPassword: hashPassword(newPassword) },
      { new: true },
    );
  }

  async archive(ids: [string]) {
    return await this.accountModel.updateMany(
      { _id: { $in: ids } },
      { archived: true },
    );
  }

  async unarchive(ids: [string]) {
    return await this.accountModel.updateMany(
      { _id: { $in: ids } },
      { archived: false },
    );
  }

  async change(model: any) {
    const { id, ...update } = model;
    return await this.accountModel.findByIdAndUpdate(id, update, {new: true});
  }

  async create(model: any) {
    const Model = this.accountModel;
    const m = new Model({
      ...model,
      hashedPassword: hashPassword('Li@12345678'),
    });
    await m.save();
    return m;
  }
}
