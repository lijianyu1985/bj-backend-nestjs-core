import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormattedResponse } from './formatted-response.interface';

@Injectable()
export class FormatInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<FormattedResponse> {
    return next.handle().pipe(
      map(
        (data) => ({
          statusCode: context.switchToHttp().getResponse().statusCode,
          success: true,
          data,
        }),
        // catchError(error =>{
        //   console.log(error)
        //   if (error instanceof BusinessError) {
        //     return throwError({
        //       success: false,
        //       message: error.message
        //     });
        //   }
        //   return throwError(error);
        // })
      ),
    );
  }
}
