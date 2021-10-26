import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ResourceDocument } from 'src/schemas/resource';
import { find, forEach, trim } from 'lodash';

@Injectable()
export class ResourceService {
  constructor(
    @Inject('RESOURCE_MODEL')
    private readonly resourceModel: Model<ResourceDocument>,
  ) {}

  async generateApiResources(pathes: [string]) {
    //All schemas
    const commonPrefixes = [
      'account',
      'client',
      'permission',
      'resource',
      'role',
      'todo',
    ];
    const newPathes = [...pathes];
    forEach(pathes, (p) => {
      if (p && p.startsWith('common/')) {
        commonPrefixes.forEach((cp) => newPathes.push(p.replace(/common\//, cp+'/')));
      }
    });
    const existingResources = await this.resourceModel.find({
      identifier: { $in: newPathes },
      type: 'API',
    });
    const ResourceModel = this.resourceModel;
    await Promise.all(
      (newPathes || []).map(async (path) => {
        if (path) {
          if (
            !find(
              existingResources,
              (x) => x.identifier.toLowerCase() === path.toLowerCase(),
            )
          ) {
            const m = new ResourceModel({
              identifier: path.toLowerCase(),
              type: 'API',
              description: '系统生成',
            });
            await m.save();
          }
        }
      }),
    );
  }

  findAllPathes(adminRoutes: []) {
    let pathes = [];
    forEach(adminRoutes, (r) => {
      if (r.path && (r.component || r.redirect)) {
        pathes.push(trim(r.path.toLowerCase(), '/'));
      }
      if (r.routes && r.routes.length) {
        const subPathes = this.findAllPathes(r.routes);
        forEach(subPathes, (sp) => {
          pathes.push(sp);
        });
      }
    });
    return pathes;
  }

  async generateAdminResources(adminRoutes: []) {
    const pathes = this.findAllPathes(adminRoutes);
    const existingResources = await this.resourceModel.find({
      identifier: { $in: pathes },
      type: 'Admin',
    });
    const ResourceModel = this.resourceModel;
    await Promise.all(
      (pathes || []).map(async (path) => {
        if (path) {
          if (
            !find(
              existingResources,
              (x) => x.identifier.toLowerCase() === path.toLowerCase(),
            )
          ) {
            const m = new ResourceModel({
              identifier: path.toLowerCase(),
              type: 'Admin',
              description: '系统生成',
            });
            await m.save();
          }
        }
      }),
    );
  }
}
