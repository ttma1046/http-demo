import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Hero } from './entities/hero';

import { HttpErrorHandler, HandleError } from './http-error-handler.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

@Injectable({
    providedIn: 'root'
})
export class HeroesService {
    heroesUrl = 'api/heroes';
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('HeroesService');

    }

    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
            .pipe(
                catchError(this.handleError('addHero', hero))
            );
    }

    /** DELETE: delete the hero from the server */
    deleteHero(id: number): Observable<{}> {
        const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
        return this.http.delete(url, httpOptions)
            .pipe(
                catchError(this.handleError('deleteHero'))
            );
    }

    /** PUT: update the hero on the server. Returns the updated hero upon success. */
    updateHero(hero: Hero): Observable<Hero> {
        httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

        return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
            .pipe(
                catchError(this.handleError('updateHero', hero))
            );
    }

    searchHeroes(term: string): Observable<Hero[]> {
        term = term.trim();

        const options = term ?
            { params: new HttpParams().set('name', term) } : {};

        return this.http.get<Hero[]>(this.heroesUrl, options)
            .pipe(
                catchError(this.handleError<Hero[]>('searchHeroes', []))
            );
    }
}
