import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config } from './entities/config';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    configUrl = 'assets/configa.json';

    constructor(private http: HttpClient) { }

    getConfig() {
        // return this.http.get(this.configUrl);
        return this.http.get<Config>(this.configUrl)
            .pipe(
                retry(3),
                catchError(this.handleError)
                );
    }

    getConfigResponse(): Observable<HttpResponse<Config>> {
        return this.http.get<Config>(
            this.configUrl,
            { observe: 'response' }
        );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`
            );
        }

        return throwError('Something bad happened; please try again later');
    }
}
