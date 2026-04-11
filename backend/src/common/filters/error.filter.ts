import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message || 'Internal logic error',
      path: ctx.getRequest().url,
    });
  }
}
