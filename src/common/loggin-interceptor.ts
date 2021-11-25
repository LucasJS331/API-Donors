import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    private logger = new Logger();
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        let ctx = context.switchToHttp();

        let response = ctx.getResponse();
        let request = ctx.getRequest();


        const now = Date.now();
        return next
        .handle()
        .pipe(
            tap(() =>this.logger
            .log(`METHOD ${request.method}: ${request.url} with Status: ${response.statusCode} - ${Date.now() - now}ms`)),
        );
        }

}