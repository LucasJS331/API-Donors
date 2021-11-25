import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";


@Catch()
export class HttpFilter implements ExceptionFilter{

    private logger = new Logger();

    catch(exception: unknown, host: ArgumentsHost){

        let context = host.switchToHttp();

        const response = context.getResponse();
        const request = context.getRequest();

        let status = exception instanceof HttpException ?
         exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        let message = exception instanceof HttpException ? exception.getResponse() : exception

        this.logger.error(`STATUS: ${status}, ${JSON.stringify(message)}`);

        response.status(status).json({
            path: request.url,
            error: message,
            timeStamps: new Date().toISOString(),
        })


    }
}