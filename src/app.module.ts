import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { TodoModule } from './modules/todo/todo.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/strategies/jwt-auth.guard';
import { FileModule } from './modules/file/file.module';
import { AccountModule } from './modules/account/account.module';
// import { CommonModule } from './modules/common/common.module';
import { ResourceModule } from './modules/resource/resource.module';
import { MiniProgramModule } from './modules/miniprogram/miniprogram.module';

@Module({
  imports: [
    PermissionModule,
    RoleModule,
    TodoModule,
    AuthModule,
    AccountModule,
    FileModule,
    // CommonModule,
    ResourceModule,
    MiniProgramModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // ...schemasProviders
  ],
})
export class AppModule {}
