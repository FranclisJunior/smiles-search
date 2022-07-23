import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/service/auth.service';
import { Router } from '@angular/router';
import { LoginURL } from '../url/url.domain';
import { TranslateService } from 'src/app/core/service/translate.service';
import { AppInjector } from 'src/app/app.injector';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  /**
   * Service to authentication.
   *
   * @type {AuthService}
   */
  private authService: AuthService;

  /**
   * Service to translate.
   *
   * @type {TranslateService}
   */
  private transtaleService: TranslateService;

  /**
   * True if the token is refreshing.
   *
   * @type {boolean}
   */
  isRefreshingToken = false;

  /**
   * Subject to share the token.
   *
   * @type {BehaviorSubject}
   */
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  /**
   * Constructor.
   */
  constructor(private injector: Injector, private router: Router) {
    setTimeout(() => {
      this.authService = this.injector.get(AuthService);
      this.transtaleService = this.injector.get(TranslateService);
    });
  }

  /**
   * HTTP request interceptor.
   *
   * @param {HttpRequest} req
   * @param {HttpHandler} next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.url.includes(LoginURL.BASE)) {
      return next.handle(req);
    }

    return next
      .handle(req)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            switch ((<HttpErrorResponse>error).status) {
              case 401:
                return this.handle401Error(req, next);
              default:
                return throwError(error);
            }
          } else {
            return throwError(error);
          }
        })
      );
  }

  /**
   * Function to renew the token when the request error is unauthorized.
   * 
   * @param req 
   * @param next 
   */
  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.includes(LoginURL.REFRESH_TOKEN)) {
      this.isRefreshingToken = false;
      return this.logout();
    }

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);

      return this.authService
        .refreshToken()
        .pipe(switchMap(newToken => {
          const newReq = req.clone({
            setHeaders: {
              'Accept-Language': this.transtaleService.getLang(),
              'Authorization': 'Bearer ' + newToken,
            }
          });
          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(newReq);
          }
          return next.handle(newReq);
        }))
        .pipe(catchError(error => {
          return this.logout();
        })).pipe(finalize(() => {
          this.isRefreshingToken = false;
        }));
        // .switchMap(newToken => {
        //   const newReq = req.clone({
        //     setHeaders: {
        //       'Accept-Language': this.transtaleService.getLang(),
        //       'Authorization': 'Bearer ' + newToken,
        //     }
        //   });
        //   if (newToken) {
        //     this.tokenSubject.next(newToken);
        //     return next.handle(newReq);
        //   }

        //   return next.handle(newReq);
        // })
        //   .catch(error => {
        //     return this.logout();
        //   })
        //   .finally(() => {
        //     this.isRefreshingToken = false;
        //   }));
    } else {
      return this.tokenSubject
        .pipe(filter(token => token != null))
        .pipe(take(1))
        .pipe(switchMap(token => {
          const newReq = req.clone({
            setHeaders: {
              'Accept-Language': this.transtaleService.getLang(),
              'Authorization': 'Bearer ' + token,
            }
          });
          return next.handle(newReq);
        }));

        // .switchMap(token => {
        //   const newReq = req.clone({
        //     setHeaders: {
        //       'Accept-Language': this.transtaleService.getLang(),
        //       'Authorization': 'Bearer ' + token,
        //     }
        //   });
        //   return next.handle(newReq);
        // });
    }
  }

  /**
   * Function to throw the logout exception.
   */
  private logout() {
    return throwError('logout');
  }
}
