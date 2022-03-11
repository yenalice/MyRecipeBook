import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Recipe } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';
import { Instruction } from '../../models/instruction';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  // get all recipes
  getRecipes(): Observable<Recipe[]> {
    const allRecipesPath: string = 'recipe';
    return this.http.get<Recipe[]>(allRecipesPath).pipe(
      tap((_) => console.log('All recipes retrieved successfully.')),
      catchError(this.handleError<Recipe[]>('getRecipes', []))
    );
  }

  // get a single recipe by id
  // QUESTION: why won't this let me return a recipe object instead of recipe array???
  getRecipe(recipeId: number): Observable<Recipe[]> {
    const singleRecipePath: string = `recipe/${recipeId}`;
    return this.http.get<Recipe[]>(singleRecipePath).pipe(
      tap((_) =>
        console.log(
          `Recipe of recipeId ${recipeId} was retrieved successfully.`
        )
      ),
      catchError(this.handleError<Recipe[]>('getRecipe'))
    );
  }

  // delete a given recipe
  deleteRecipe(recipeId: number): Observable<Recipe> {
    const singleRecipePath: string = `recipe/${recipeId}`;
    return this.http.delete<Recipe>(singleRecipePath).pipe(
      tap((_) =>
        console.log(`Recipe of id ${recipeId} was deleted successfully.`)
      ),
      catchError(this.handleError<Recipe>('deleteRecipe'))
    );
  }

  // get all ingredients for a given recipeId
  getIngredients(recipeId: number): Observable<Ingredient[]> {
    const recipeIngredients: string = `ingredient/${recipeId}`;
    return this.http
      .get<Ingredient[]>(recipeIngredients)
      .pipe(
        tap(
          (_) =>
            console.log(
              `Ingredients of recipeId ${recipeId} were retrieved successfully.`
            ),
          catchError(this.handleError<Ingredient[]>('getIngredients'))
        )
      );
  }

  // get all instructions for a given recipeId
  getInstructions(recipeId: number): Observable<Instruction[]> {
    const recipeInstructions: string = `instruction/${recipeId}`;
    return this.http.get<Instruction[]>(recipeInstructions).pipe(
      tap((_) =>
        console.log(
          `Instructions of recipeId ${recipeId} were retrieved successfully.`
        )
      ),
      catchError(this.handleError<Instruction[]>('getInstructions'))
    );
  }

  // error handler
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
