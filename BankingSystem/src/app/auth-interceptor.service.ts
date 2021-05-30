import {
    HttpEventType,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const newrequest = req.clone({
            headers: new HttpHeaders({
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json', 'crossDomain': 'true'
            })
        });
        console.log(newrequest);
        return next.handle(newrequest).pipe(tap(event => {
            if (event.type === HttpEventType.Response)
                console.log('response');
        }));
    }
}
