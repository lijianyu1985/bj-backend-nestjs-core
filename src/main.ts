/*
 * @Author: your name
 * @Date: 2021-10-18 11:16:54
 * @LastEditTime: 2021-10-18 17:11:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { FormatInterceptor } from './infrastructure/response/format.interceptor';
import { BusinessErrorFilter } from './infrastructure/response/business.error';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Admin Api')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const PORT = config.get('app.port');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  app.useGlobalInterceptors(new FormatInterceptor());
  app.useGlobalFilters(new BusinessErrorFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}

bootstrap();
