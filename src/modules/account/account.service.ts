import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { isJSON, hashPassword } from 'src/utils/utils';
import { AccountDocument } from 'src/schemas/account';
import { BusinessError } from 'src/infrastructure/response/business.error';

@Injectable({})
export class AccountService {
  constructor(
    @Inject('ACCOUNT_MODEL')
    private readonly accountModel: Model<AccountDocument>,
  ) {}

  async page({
    page = 1,
    size = 10,
    query = null,
    sort = null,
    projection = null,
    population = null,
  }) {
    const safePage = Number(page);
    const safeSize = Number(size);
    const queryObject = isJSON(query) ? JSON.parse(query) : {};
    const sortObject = isJSON(sort) ? JSON.parse(sort) : {};
    queryObject.archived = { $in: [false, null, undefined] };
    const total = await this.accountModel.count(queryObject);
    const listQuery = this.accountModel
      .find(queryObject, projection)
      .sort(sortObject)
      .limit(safeSize)
      .skip((safePage - 1) * safeSize);
    if (population) {
      const populationItems = population.split(',');
      await Promise.all(
        (populationItems || []).map(async (populationItem) => {
          const populationItemSplits = populationItem.split(':');
          if (populationItemSplits.length === 2) {
            listQuery.populate(
              populationItemSplits[0],
              populationItemSplits[1],
            );
          } else {
            listQuery.populate(populationItemSplits[0]);
          }
        }),
      );
    }

    const list = await listQuery;
    return {
      list,
      page: safePage,
      size: safeSize,
      total,
    };
  }

  async get(id: string, projection: string = null, population = null) {
    const account = await this.accountModel.findById(id, projection);
    return account;
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
