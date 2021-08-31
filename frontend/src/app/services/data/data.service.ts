import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Recipe } from '../../models/recipe';
import { Ingredient } from '../../models/ingredient';
import { Instruction } from '../../models/instruction';
import { User } from 'src/app/models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  currUser?: User;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    if (cookieService.get('User'))
      this.currUser = JSON.parse(cookieService.get('User'));
  }

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

  // add recipe
  addRecipe(recipe: Recipe): Observable<Recipe[]> {
    const addRecipePath: string = `recipe`;
    return this.http.post<Recipe[]>(addRecipePath, recipe).pipe(
      tap((_) => console.log('Recipe added successfully.')),
      catchError(this.handleError<Recipe[]>('addRecipe'))
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

  // add user
  addUser(user: User) {
    const addUserPath: string = `user`;
    return this.http.post<User[]>(addUserPath, user).pipe(
      tap((_) => console.log('User added successfully.')),
      catchError(this.handleError<User[]>('addUser'))
    );
  }

  // get user given userId
  getUser(userId: number): Observable<User[]> {
    const userPath: string = `user/${userId}`;
    return this.http.get<User[]>(userPath).pipe(
      tap((_) =>
        console.log(`Users of userId ${userId} was retrieved successfully.`)
      ),
      catchError(this.handleError<User[]>('getUser'))
    );
  }

  // validate user
  validateUser(username: string, password: string): Observable<any> {
    const userPath: string = `user/login`;
    const reqBody = { username: username, password: password };
    return this.http.post<any>(userPath, reqBody).pipe(
      tap((_) =>
        console.log(`Validation result for user was retrieved successfully.`)
      ),
      catchError(this.handleError<any>('getValidation'))
    );
  }

  // TODO: favorite/bookmark model and use as type for arrays in these functions????
  // add favorite/bookmark
  addBookmark(recipeId: number) {
    const addBookmarkPath: string = `favorite/${this.currUser?.userId}?recipe=${recipeId}`;
    return this.http.post(addBookmarkPath, {}).pipe(
      tap((_) => console.log('Bookmark added successfully.')),
      catchError(this.handleError('addBookmark'))
    );
  }

  // display all favorites/bookmarks for a user
  getBookmarks(userId: number): Observable<Recipe[]> {
    const getBookmarkPath: string = `favorite/${this.currUser?.userId}`;
    return this.http.get<Recipe[]>(getBookmarkPath).pipe(
      tap((_) =>
        console.log(
          `Bookmarks for user with id ${userId} was retrieved successfully.`
        )
      ),
      catchError(this.handleError<Recipe[]>('getRecipe'))
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
