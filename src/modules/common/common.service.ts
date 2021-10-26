import { Inject, Injectable } from '@nestjs/common';
import { Mongoose } from 'mongoose';
import { BusinessError } from 'src/infrastructure/response/business.error';
import { isJSON, populate } from 'src/utils/utils';

@Injectable({})
export class CommonService {
  constructor(@Inject('DATABASE_CONNECTION') private mongoose: Mongoose) {}

  private getModel(modelName: string) {
    if (!this.mongoose.models[modelName]) {
      throw new BusinessError(`当前Model不存在：${modelName}`);
    }
    return this.mongoose.models[modelName];
  }

  async all({ modelName, query, projection, population }) {
    const queryObject = isJSON(query) ? JSON.parse(query) : {};
    queryObject.archived = { $in: [false, null, undefined] };
    return await populate(
      population,
      this.getModel(modelName).find(queryObject, projection),
    );
  }

  async page({
    page = 1,
    size = 10,
    query = null,
    sort = null,
    projection,
    modelName,
    population, //roles:_id name,resources:_id name
  }) {
    const safePage = Number(page);
    const safeSize = Number(size);
    const queryObject = isJSON(query) ? JSON.parse(query) : {};
    const sortObject = isJSON(sort) ? JSON.parse(sort) : {};
    queryObject.archived = { $in: [false, null, undefined] };
    const total = await this.getModel(modelName).count(queryObject);

    const list = await populate(
      population,
      this.getModel(modelName)
        .find(queryObject, projection)
        .sort(sortObject)
        .limit(safeSize)
        .skip((safePage - 1) * safeSize),
    );

    return {
      list,
      page: safePage,
      size: safeSize,
      total,
    };
  }

  async find({
    modelName,
    query = null,
    projection,
    population = null,
    opts = null,
  }) {
    const queryObject = isJSON(query) ? JSON.parse(query) : {};
    queryObject.archived = { $in: [false, null, undefined] };
    if (!projection) {
      return await populate(
        population,
        this.getModel(modelName).find(queryObject),
      );
    }
    if (typeof projection === 'object' && !opts) {
      return await populate(
        population,
        this.getModel(modelName).find(queryObject, projection),
      );
    }
    return await populate(
      population,
      this.getModel(modelName).find(queryObject, projection, opts),
    );
  }

  async get(
    modelName: string,
    id: string,
    projection: string = null,
    population: string = null,
  ) {
    const account = await populate(
      population,
      this.getModel(modelName).findById(id, projection),
    );
    return account;
  }

  async insert(modelName: string, model: any, opts: any = null) {
    const Model = this.getModel(modelName);
    const m = new Model(model);
    await m.save(opts);
    return m;
  }

  async updateById(
    modelName: string,
    id: string,
    update: any,
    opts = { new: true },
  ) {
    return await this.getModel(modelName).findByIdAndUpdate(id, update, opts);
  }

  async getByQuery(modelName: string, query, projection: any, opts: any) {
    if (!projection) {
      return await this.getModel(modelName).findOne(query);
    }
    if (typeof projection === 'object' && !opts) {
      return await this.getModel(modelName).findOne(query, projection);
    }
    return await this.getModel(modelName).findOne(query, projection, opts);
  }

  async archiveByIds(modelName: string, ids: [string], opts = { new: true }) {
    return await this.getModel(modelName).updateMany(
      { _id: { $in: ids } },
      { archived: true },
      opts,
    );
  }

  async archive(modelName: string, query: any, opts = { new: true }) {
    return await this.getModel(modelName).updateMany(
      query,
      { archived: true },
      opts,
    );
  }

  async unarchive(modelName: string, query: any, opts = { new: true }) {
    return await this.getModel(modelName).updateMany(
      query,
      { archived: false },
      opts,
    );
  }

  async updateByQuery(
    modelName: string,
    query: any,
    update: any,
    opts = { new: true },
  ) {
    return await this.getModel(modelName).updateMany(query, update, opts);
  }

  async toggleArchive(
    modelName: string,
    ids: string[],
    archived: boolean,
    opts = { new: true },
  ) {
    return await this.getModel(modelName).updateMany(
      { _id: { $in: ids } },
      { archived },
      opts,
    );
  }
}
