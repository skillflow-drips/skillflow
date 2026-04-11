import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class BigIntInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => this.serialize(data))
    );
  }

  private serialize(obj: any): any {
    return JSON.parse(
      JSON.stringify(obj, (_, v) => (typeof v === 'bigint' ? v.toString() : v))
    );
  }
}
