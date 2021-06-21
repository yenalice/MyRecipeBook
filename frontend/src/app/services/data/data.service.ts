import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Recipe } from '../../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  allRecipesPath: string = 'recipe';

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.allRecipesPath).pipe(
      tap((_) => console.log('Data retrieved successfully.')),
      catchError(this.handleError<Recipe[]>('searchRecipes', []))
    );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
