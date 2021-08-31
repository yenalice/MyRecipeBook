import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { User } from 'src/app/models/user';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.less'],
})
export class FavoritesComponent implements OnInit {
  bookmarkedRecipes: Recipe[] = [];
  currUser?: User;

  constructor(
    private dataService: DataService,
    private cookieService: CookieService
  ) {
    this.currUser = JSON.parse(this.cookieService.get('User'));
  }

  ngOnInit(): void {
    this.getBookmarks();
  }

  // get all recipes from data service
  getBookmarks(): void {
    if (this.currUser) {
      this.dataService
        .getBookmarks(this.currUser.userId!)
        .subscribe((bookmarks) => (this.bookmarkedRecipes = bookmarks));
    } else {
      // TODO: redirect to a not found page or a page telling user to log in?
    }
  }

  // TODO: create a list view component & reuse view all page info
}
