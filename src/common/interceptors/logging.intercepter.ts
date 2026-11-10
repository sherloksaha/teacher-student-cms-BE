import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";


@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    private readonly logger = new Logger(LoggingInterceptor.name);

    // contains request and response objects
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {


        const request = context.switchToHttp().getRequest();
        const { method, url, body, query, params } = request;
        const userAgent = request.get('user-agent') || 'unknown';
        const ip = request.ip;
        const userId = request.user?.id || 'guest';
        console.log("oduuuuuu", body)
        this.logger.log(`Request: ${method} ${url} - User: ${userId} - IP: ${ip} - User-Agent: ${userAgent}`)

        const startTime = Date.now();
        // return next.handle();
        return next.handle().pipe(
            tap({
                next: (data) => {
                    const endTime = Date.now();
                    const duration = endTime - startTime;
                    const statusCode = context.switchToHttp().getResponse().statusCode;
                    this.logger.log(`Response: ${statusCode} - Duration: ${duration}ms`);
                },
                error: (err) => {
                    this.logger.error(`Error: ${err.message}`);
                }
            })
        )
    }


}
