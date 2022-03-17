import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './authconfig.interceptor';

@NgModule({
  imports: [HttpClientModule],
  exports: [HttpClientModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }]
})

export class SharedModule {

}
