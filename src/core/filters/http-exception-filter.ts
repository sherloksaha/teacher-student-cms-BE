import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { COLOR } from '../contants';


@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;

    // Extract status and message dynamically based on exception type
    if (exception instanceof HttpException) {
      // HttpException has getStatus() method - use it dynamically
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Extract message based on response type
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        // Try multiple sources for message
        message =
          (exceptionResponse as any)?.message ||
          exception.message ||
          this.getDefaultMessageForStatus(status);

        // Handle array messages
        if (Array.isArray(message)) {
          message = message.join(', ');
        }
      } else {
        // Fallback to exception message or status-based default
        message = exception.message || this.getDefaultMessageForStatus(status);
      }
    } else if (exception instanceof Error) {
      // For non-HTTP exceptions, try to infer status from error name/type
      status = this.inferStatusCodeFromError(exception);
      message = exception.message || this.getDefaultMessageForStatus(status);
    } else if (exception && typeof exception === 'object') {
      // Handle plain objects that might contain exception data
      const exceptionObj = exception as any;

      // Check if it has statusCode property
      if (typeof exceptionObj.statusCode === 'number') {
        status = exceptionObj.statusCode;
        message =
          exceptionObj.message ||
          exceptionObj.error?.message ||
          this.getDefaultMessageForStatus(status);
      } else if (typeof exceptionObj.status === 'number') {
        status = exceptionObj.status;
        message =
          exceptionObj.message ||
          exceptionObj.error?.message ||
          this.getDefaultMessageForStatus(status);
      } else {
        // Try to extract message from object
        try {
          message =
            exceptionObj.message ||
            exceptionObj.error?.message ||
            JSON.stringify(exceptionObj);
        } catch {
          message =
            exceptionObj.message ||
            exceptionObj.error?.message ||
            '[unserializable error object]';
        }
        status = this.inferStatusCodeFromMessage(message);
      }
    } else {
      // Unknown exception type - try to extract info or default to 500
      const exceptionStr = String(exception);
      status = this.inferStatusCodeFromMessage(exceptionStr);
      message = exceptionStr || 'An unexpected error occurred';
    }

    // Ensure message is never undefined, null, or empty
    if (
      !message ||
      message === 'undefined' ||
      message === 'null' ||
      message.trim() === ''
    ) {
      message = this.getDefaultMessageForStatus(status);
    }

    // Log the error with meaningful information
    const errorLog = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message,
      error: exception instanceof Error ? exception.name : 'Unknown Error',
    };

    const now = new Date();
    const currentDateTime = now.toLocaleString();

    // Log based on severity - always log with a meaningful message
    if (status >= 500) {
      console.error(
        COLOR.red(
          `${currentDateTime}: ${request.method} ${
            request.url
          } - ${status} - ${message}\n${
            exception instanceof Error
              ? exception.stack
              : JSON.stringify(errorLog, null, 2)
          }`
        )
      );
    } else {
      console.warn(
        COLOR.yellow(
          `${currentDateTime}: ${request.method} ${request.url} - ${status} - ${message}`
        )
      );
    }

    // Send the formatted error response only if it hasn't been sent already
    const response = ctx.getResponse();

    // Check if response has already been sent (e.g., by FormatResponseInterceptor)
    if (!response.headersSent) {
      response.status(status).json({
        status: false,
        statusCode: status,
        message: message,
        errors: [],
        data: {},
      });
    }

    // Note: The response formatting is handled by FormatResponseInterceptor
    // This filter is primarily for proper error logging to prevent "undefined" logs
  }

  /**
   * Infers HTTP status code from error type/name
   * @param error - The error instance
   * @returns Inferred HTTP status code
   */
  private inferStatusCodeFromError(error: Error): number {
    const errorName = error.name?.toLowerCase() || '';
    const errorMessage = error.message?.toLowerCase() || '';

    // Check error name patterns
    if (
      errorName.includes('unauthorized') ||
      errorMessage.includes('unauthorized')
    ) {
      return HttpStatus.UNAUTHORIZED;
    }
    if (errorName.includes('forbidden') || errorMessage.includes('forbidden')) {
      return HttpStatus.FORBIDDEN;
    }
    if (errorName.includes('not found') || errorMessage.includes('not found')) {
      return HttpStatus.NOT_FOUND;
    }
    if (
      errorName.includes('bad request') ||
      errorMessage.includes('bad request')
    ) {
      return HttpStatus.BAD_REQUEST;
    }
    if (errorName.includes('conflict') || errorMessage.includes('conflict')) {
      return HttpStatus.CONFLICT;
    }
    if (
      errorName.includes('validation') ||
      errorMessage.includes('validation')
    ) {
      return HttpStatus.BAD_REQUEST;
    }

    // Default to 500 for unknown errors
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /**
   * Infers HTTP status code from message content
   * @param message - The error message
   * @returns Inferred HTTP status code
   */
  private inferStatusCodeFromMessage(message: string): number {
    const lowerMessage = message.toLowerCase();

    // Check for specific status codes in message patterns
    if (
      lowerMessage.includes('not acceptable') ||
      lowerMessage.includes('phone number already exists') ||
      lowerMessage.includes('already exists')
    ) {
      return HttpStatus.NOT_ACCEPTABLE;
    }
    if (
      lowerMessage.includes('unauthorized') ||
      lowerMessage.includes('authentication')
    ) {
      return HttpStatus.UNAUTHORIZED;
    }
    if (lowerMessage.includes('forbidden')) {
      return HttpStatus.FORBIDDEN;
    }
    if (lowerMessage.includes('not found')) {
      return HttpStatus.NOT_FOUND;
    }
    if (
      lowerMessage.includes('bad request') ||
      lowerMessage.includes('validation')
    ) {
      return HttpStatus.BAD_REQUEST;
    }
    if (lowerMessage.includes('conflict')) {
      return HttpStatus.CONFLICT;
    }

    // Default to 500 for unknown errors
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  /**
   * Gets default message based on HTTP status code
   * @param statusCode - HTTP status code
   * @returns Default message for the status code
   */
  private getDefaultMessageForStatus(statusCode: number): string {
    const statusMessages: Record<number, string> = {
      [HttpStatus.BAD_REQUEST]: 'Bad request',
      [HttpStatus.UNAUTHORIZED]: 'Unauthorized',
      [HttpStatus.FORBIDDEN]: 'Forbidden',
      [HttpStatus.NOT_FOUND]: 'Resource not found',
      [HttpStatus.METHOD_NOT_ALLOWED]: 'Method not allowed',
      [HttpStatus.NOT_ACCEPTABLE]: 'Not acceptable',
      [HttpStatus.CONFLICT]: 'Conflict',
      [HttpStatus.UNPROCESSABLE_ENTITY]: 'Unprocessable entity',
      [HttpStatus.TOO_MANY_REQUESTS]: 'Too many requests',
      [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal server error',
      [HttpStatus.BAD_GATEWAY]: 'Bad gateway',
      [HttpStatus.SERVICE_UNAVAILABLE]: 'Service unavailable',
      [HttpStatus.GATEWAY_TIMEOUT]: 'Gateway timeout',
    };

    return statusMessages[statusCode] || 'An error occurred';
  }
}
