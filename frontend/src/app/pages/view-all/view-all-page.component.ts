import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data/data.service';
import { Recipe } from './../../models/recipe';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-all-page',
  templateUrl: './view-all-page.component.html',
  styleUrls: ['./view-all-page.component.less'],
})
export class ViewAllPageComponent implements OnInit {
  recipes: Recipe[] = [];
  faPlusCircle = faPlusCircle;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllRecipes();
  }

  // get all recipes from data service
  getAllRecipes(): void {
    this.dataService
      .getRecipes()
      .subscribe((recipes) => (this.recipes = recipes));
  }
}
