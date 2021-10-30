import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseService } from 'src/infrastructure/base-parts/base.service';
import { PermissionDocument } from 'src/schemas/permission';

export class PermissionService extends BaseService<PermissionDocument> {
  constructor(
    @Inject('PERMISSION_MODEL')
    private readonly permissionModel: Model<PermissionDocument>,
  ) {
    super(permissionModel);
  }
}
