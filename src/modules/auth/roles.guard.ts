import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { trim } from 'lodash';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, route, query, body } = context.switchToHttp().getRequest();
    if (user && user.userId && route && route.path) {
      const resources = await this.authService.getResources(user.userId, 'API');
      if (resources.includes('*')) {
        return true;
      }
      let requestResource = trim(route.path, '/').toLowerCase();
      if (query.modelName && requestResource.startsWith('common')) {
        requestResource = requestResource.replace(
          /common/g,
          query.modelName.toLowerCase(),
        );
      }
      if (body.modelName && requestResource.startsWith('common')) {
        requestResource = requestResource.replace(
          /common/g,
          body.modelName.toLowerCase(),
        );
      }
      return resources.includes(requestResource);
    }
    return true;
  }
}
