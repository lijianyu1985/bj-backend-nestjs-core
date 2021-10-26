import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

export class BusinessError extends Error {
  constructor(m: string) {
    super(m);
  }
}

@Catch(BusinessError)
export class BusinessErrorFilter implements ExceptionFilter {
  catch(exception: BusinessError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const message = exception.message;

    response.json({
      statusCode: response.statusCode,
      success: false,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
