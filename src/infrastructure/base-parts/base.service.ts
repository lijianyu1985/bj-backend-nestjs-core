import { Model } from 'mongoose';
import { isJSON, populate } from 'src/utils/utils';
import { DeleteBaseDto } from './dto/delete-base.dto';
import { FindQueryBaseDto } from './dto/find-query-base.dto';
import { GetBaseDto } from './dto/get-baes.dto';
import { PageQueryBaseDto } from './dto/page-query-base.dto';

export abstract class BaseService<T> {
  constructor(private model: Model<T>) { }

   async  page({
    page = 1,
    size = 10,
    query = null,
    sort = null,
    projection,
    population, //roles:_id name,resources:_id name
  }: PageQueryBaseDto) {
    const safePage = Number(page);
    const safeSize = Number(size);
    const queryObject = isJSON(query) ? JSON.parse(query) : {};
    const sortObject = isJSON(sort) ? JSON.parse(sort) : {};
    queryObject.archived = { $in: [false, null, undefined] };
    const total = await this.model.count(queryObject);

    const list = await populate(
      population,
      this.model
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
    query = null,
    projection,
    population = null,
  }: FindQueryBaseDto) {
    const queryObject = isJSON(query) ? JSON.parse(query) : {};
    queryObject.archived = { $in: [false, null, undefined] };
   
    if (!projection) {
      return await populate(
        population,
        this.model.find(queryObject),
      );
    }
    return await populate(
      population,
      this.model.find(queryObject, projection),
    );
  }

  async get(
    { id,
      projection = null,
      population = null
    }: GetBaseDto
  ) {
    const account = await populate(
      population,
      this.model.findById(id, projection),
    );
    return account;
  }

  async insert(model: any, opts: any = null) {
    const Model = this.model;
    const m = new Model(model);
    await m.save(opts);
    return m;
  }

  async updateById(
    id: string,
    update: any,
    opts = { new: true },
  ) {
    return await this.model.findByIdAndUpdate(id, update, opts);
  }

  async getByQuery(query, projection: any, opts: any) {
    if (!projection) {
      return await this.model.findOne(query);
    }
    if (typeof projection === 'object' && !opts) {
      return await this.model.findOne(query, projection);
    }
    return await this.model.findOne(query, projection, opts);
  }

  async archiveByIds({
    ids
  }: DeleteBaseDto) {
    return await this.model.updateMany(
      { _id: { $in: Array.isArray(ids) ? ids : [ids] } } as any,
      { archived: true } as any,
    );
  }

  async archive(query: any, opts = { new: true }) {
    return await this.model.updateMany(
      query,
      { archived: true } as any,
      opts,
    );
  }

  async unarchive(query: any, opts = { new: true }) {
    return await this.model.updateMany(
      query,
      { archived: false } as any,
      opts,
    );
  }

  async updateByQuery(
    query: any,
    update: any,
    opts = { new: true },
  ) {
    return await this.model.updateMany(query, update, opts);
  }

  async toggleArchive(
    ids: string[],
    archived: boolean,
    opts = { new: true },
  ) {
    return await this.model.updateMany(
      { _id: { $in: ids } } as any,
      { archived } as any,
      opts,
    );
  }
}
