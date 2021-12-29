import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {RESPONSE_OBSERVE_OPTION} from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  /**
   * Performs a GET to API
   * @param endpoint Target endpoint
   * @param params URL parameters
   * @param options Request options if any
   */
  get(endpoint: string, params?: any, options?: any): Observable<any> {
    if (!options) {
      options = {};
    }
    options.observe = RESPONSE_OBSERVE_OPTION;

    if (params) {
      let searchParams = new HttpParams();
      params.forEach((param) => {
        searchParams = searchParams.append(param, params[param]);
      });
      options.params = (!options.params && searchParams) || options.params;
    }

    let url: string;
    url = endpoint;

    options.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get(url, options).pipe(
      // timeout(environment.API_TIMEOUT_DURATION),
      catchError(this.errorHandler)
    );
  }

  /**
   * Performs a POST to API
   * @param endpoint Target endpoint
   * @param body Body message to provide
   * @param params URL parameters
   * @param options Request options if any
   */
  post(
    endpoint: string,
    body: any,
    params?: any,
    options?: any
  ): Observable<any> {
    if (!options) {
      options = {};
      options.observe = RESPONSE_OBSERVE_OPTION;
    }

    if (params) {
      let searchParams = new HttpParams();
      params.forEach((param) => {
        searchParams = searchParams.append(param, params[param]);
      });
      options.params = (!options.params && searchParams) || options.params;
    }

    let url: string;

    url = endpoint;

    options.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(url, body, options).pipe(
      // timeout(environment.API_TIMEOUT_DURATION),
      catchError(this.errorHandler)
    );
  }

  /**
   * Performs a PUT to API
   * @param endpoint Target endpoint
   * @param body Body message to provide
   * @param params URL parameters
   * @param options Request options if any
   */
  put(
    endpoint: string,
    body: any,
    params?: any,
    options?: any
  ): Observable<any> {
    if (!options) {
      options = {};
      options.observe = RESPONSE_OBSERVE_OPTION;
    }

    if (params) {
      let searchParams = new HttpParams();
      params.forEach((param) => {
        searchParams = searchParams.append(param, params[param]);
      });
      options.params = (!options.params && searchParams) || options.params;
    }

    let url: string;
    url = endpoint;

    options.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put(url, body, options).pipe(
      // timeout(environment.API_TIMEOUT_DURATION),
      catchError(this.errorHandler)
    );
  }

  /**
   * Performs a PATCH to API
   * @param endpoint Target endpoint
   * @param body Body message to provide
   * @param params URL parameters
   * @param options Request options if any
   */
  patch(
    endpoint: string,
    body: any,
    params?: any,
    options?: any
  ): Observable<any> {
    if (!options) {
      options = {};
      options.observe = RESPONSE_OBSERVE_OPTION;
    }
    if (params) {
      let searchParams = new HttpParams();
      params.forEach((param) => {
        searchParams = searchParams.append(param, params[param]);
      });
      options.params = (!options.params && searchParams) || options.params;
    }

    options.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    let url: string;
    url = endpoint;
    return this.http.patch(url, body, options).pipe(
      // timeout(environment.API_TIMEOUT_DURATION),
      catchError(this.errorHandler)
    );
  }

  /**
   * Performs a DELETE to API
   * @param endpoint Target endpoint
   * @param options Request options if any
   */
  delete(endpoint: string, options?: any): Observable<any> {
    if (!options) {
      options = {};
      options.observe = RESPONSE_OBSERVE_OPTION;
    }

    let url: string;
    url = endpoint;

    options.headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.http.delete(url, options).pipe(
      // timeout(environment.API_TIMEOUT_DURATION),
      catchError(this.errorHandler)
    );
  }

  private errorHandler(response: HttpErrorResponse): Observable<never> {
    // Logger.errorObject(this, response, "ApiService");

    return throwError(() => response || 'Api request got a Server Error');
  }
}
