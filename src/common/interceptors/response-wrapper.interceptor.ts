import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseDataResponse, BaseResponse } from '../dtos/base-response.dto';
import {
  OVERRIDE_MESSAGE_KEY,
  MessageFunction,
} from '../decorators/set-response-message.decorator';
import { WRAP_RESPONSE_KEY, WRAP_WITH_DATA_KEY } from '../decorators/wrap-response.decorator';

@Injectable()
export class ResponseWrapperInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const shouldWrap = this.reflector.get<boolean>(WRAP_RESPONSE_KEY, context.getHandler());

    if (!shouldWrap) {
      return next.handle();
    }

    const wrapWithData = this.reflector.get<boolean>(WRAP_WITH_DATA_KEY, context.getHandler());

    const messageMetadata = this.reflector.get<string | MessageFunction>(
      OVERRIDE_MESSAGE_KEY,
      context.getHandler(),
    );

    return next.handle().pipe(
      map(data => {
        let message = 'Operation completed successfully';

        if (messageMetadata) {
          if (typeof messageMetadata === 'function') {
            message = messageMetadata(data, context);
          } else {
            message = messageMetadata;
          }
        }

        if (wrapWithData) {
          return new BaseDataResponse(message, true, data);
        } else {
          return new BaseResponse(message, true);
        }
      }),
    );
  }
}
