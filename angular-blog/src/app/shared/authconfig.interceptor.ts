import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";
import { catchError, tap, throwError } from "rxjs";



@Injectable()


export class AuthInterceptor implements HttpInterceptor {
    constructor(
      private authService: AuthService,
      private router: Router
      ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.authService.getToken();
        console.log(authToken);
        console.log(this.authService.isAuthenticated());
        // /auth/local
        //  /auth/local/register
        if (authToken){
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
      }
        return next.handle(req)
        .pipe(
          tap(()=> {console.log('Intercept')}),
          catchError((error: HttpErrorResponse) => {
            console.log(['Interceptor Error: ', error])
            if (error.status === 401) {
              this.authService.logout()
              this.router.navigate(['/admin', 'login'], {
                queryParams: {
                  authServiceFailed: true
                }
              }
              )
            }
            return throwError(error)
          })
        )
    }
}
