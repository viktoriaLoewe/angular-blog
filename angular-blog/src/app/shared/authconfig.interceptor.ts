import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth/auth.service";


@Injectable()


export class AuthInterceptor implements HttpInterceptor {
    constructor(
      private authService: AuthService
      ) { }
    intercept(req: HttpRequest<any>, htphandl: HttpHandler) {
        const authToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return htphandl.handle(req);
    }
}
