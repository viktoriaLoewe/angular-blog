import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  endpoint: string = 'https://ngx-training.com';
  // public error$: Subject<string> = new Subject<string>()

  constructor(
    private http: HttpClient,
    public router: Router
    ) {}

  // Sign-up
  signup(user: User): Observable<any> {
    let api = `${this.endpoint}/auth/local/register`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }


  // Login
  login(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/auth/local/`, user)
      // .pipe(tap(this.setToken),catchError(this.handleError.bind(this)))
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }


  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  logout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/admin', 'login']);
    }
  }


isAuthenticated(): boolean {
    return !!this.getToken
  }

  // Error
  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    // switch (message) {
    //   case 'INVALID_EMAIL':
    //     this.error$.next('Invalid email')
    //     break
    //   case 'INVALID_PASSWORD':
    //     this.error$.next('Invalid password')
    //     break
    //   case 'EMAIL_NOT_FOUND':
    //     this.error$.next('Email does not exist')
    //     break
    // }

    return throwError(error)
  }
}
