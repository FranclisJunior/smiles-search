import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { AppInjector } from '../../app.injector';

import { SERVER_URL } from '../../shared/url/url.domain';
import { TranslateService } from '../service/translate.service';

/**
 * The 'BaseService' class provides the common API for all services.
 *
 * The HTTP request operation are already implemented.
 *
 * All services MUST extend this class.
 */
export abstract class BaseService {
    /**
     * Client for the HTTP operations.
     *
     * @type {HttpClient}
     */
    protected http: HttpClient = AppInjector.get(HttpClient);

    /**
     * Service to translate messages.
     */
    protected translateService: TranslateService = AppInjector.get(TranslateService);

    /**
     * Constructor.
     */
    constructor() {}

    /**
     * HTTP Method GET.
     *
     * @param {string} url
     * @param {Object} params
     * @returns {Observable<Object>}
     */
    get(url, params: HttpParams = null) {
        return this.http.get(SERVER_URL + url, {
            headers: this.getHeaders(),
            params: params
        });
    }

    /**
     * HTTP Method POST.
     *
     * @param {string} url
     * @param {Object} body
     * @returns {Observable<Object>}
     */
    post(url, body = {}) {
        return this.http.post(SERVER_URL + url, body, {
            headers: this.getHeaders()
        });
    }

    /**
     * HTTP Method PUT.
     *
     * @param {string} url
     * @param {Object} body
     * @returns {Observable<Object>}
     */
    put(url, body = {}) {
        return this.http.put(SERVER_URL + url, body, {
            headers: this.getHeaders()
        });
    }

    /**
     * HTTP Method PATCH.
     *
     * @param {string} url
     * @param {Object} body
     * @returns {Observable<Object>}
     */
    patch(url, body = {}) {
        return this.http.patch(SERVER_URL + url, body, {
            headers: this.getHeaders()
        });
    }

    /**
     * HTTP Method DELETE.
     *
     * @param {string} url
     * @returns {Observable<Object>}
     */
    delete(url) {
        return this.http.delete(SERVER_URL + url, { headers: this.getHeaders() });
    }

    /**
     * Executes before the request.
     *
     * @param {HttpHeaders} httpHeaders
     */
    protected customHeaders(httpHeaders: HttpHeaders): void { }

    /**
     * Gets the default headers to request the server.
     *
     * @returns {HttpHeaders}
     */
    protected getHeaders(): HttpHeaders {
        let httpHeaders: HttpHeaders;
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            httpHeaders = new HttpHeaders()
                .set('Authorization', user.token)
                .set('Accept-Language', this.translateService.getLang());
        } else {
            httpHeaders = new HttpHeaders().set(
                'Accept-Language',
                this.translateService.getLang()
            );
        }

        this.customHeaders(httpHeaders);
        return httpHeaders;
    }

}
