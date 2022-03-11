import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // QUESTION: i got this line of code from an article online: http://www.projectcodify.com/angular-set-base-url-dynamically
    const baseUrl = document.getElementsByTagName('base')[1].href;
    // but there was already a base tag element declared in index.html. When I replaced it, my app crashed because it was used to load css.
    // so is it ok to keep a second base tag element in index.html and just access with document.getElementsByTagName('base')[1].href?
    const apiReq = req.clone({ url: `${baseUrl}${req.url}` });
    return next.handle(apiReq);
  }
}
