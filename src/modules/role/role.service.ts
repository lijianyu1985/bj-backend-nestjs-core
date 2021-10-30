import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseService } from 'src/infrastructure/base-parts/base.service';
import { RoleDocument } from 'src/schemas/role';

export class RoleService extends BaseService<RoleDocument> {
  constructor(
    @Inject('ROLE_MODEL')
    private readonly roleModel: Model<RoleDocument>,) {
    super(roleModel);
  }
}
