import { ArgumentsHost, ExceptionFilter, Catch, HttpException } from "@nestjs/common";
import { Response } from "express";
import { appendFileSync } from "fs";

export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode =  this.getStatusCode(exception);
    const message = this.getErrorMessage(exception);
    const timestamp = new Date().toISOString();
  
    const responseToUser = {
      statusCode,
      message,
      timestamp,
    };


    appendFileSync('errors.log', `[${timestamp}] ${statusCode} - ${message}\n`);

    response.status(statusCode).json(responseToUser);
  }

  private getStatusCode(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    if (typeof exception === 'object' && exception !== null && 'status' in exception) {
      return (exception as { status: number }).status;
    }
    return 500;
  }

  private getErrorMessage(exception: unknown): string {
    if (exception instanceof Error) {
      return exception.message;
    }
    if (typeof exception === 'string') {
      return exception;
    }
    return 'Internal server error';
  }
}
