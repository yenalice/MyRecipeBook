import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe';
import { Ingredient } from 'src/app/models/ingredient';
import { Instruction } from 'src/app/models/instruction';
import { DataService } from 'src/app/services/data/data.service';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.less'],
})
export class DetailsPageComponent implements OnInit {
  recipe: Recipe[] = [];
  ingredients: Ingredient[] = [];
  instructions: Instruction[] = [];
  formattedCookTime: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getRecipeData();
  }

  // retrieve recipe data matching this url's recipeId
  getRecipeData() {
    const id = Number(this.route.snapshot.paramMap.get('recipeId'));

    this.dataService.getRecipe(id).subscribe((recipe) => {
      this.recipe = recipe;
      this.formattedCookTime = this.formatCookTime(recipe[0].cookTime);
      this.getIngredientsData(id);
      this.getInstructionsData(id);
    });
  }

  // retrieve ingredients data matching a given recipeId
  getIngredientsData(recipeId: number) {
    this.dataService
      .getIngredients(recipeId)
      .subscribe((ingredients) => (this.ingredients = ingredients));
  }

  // retrieve instructions data matching a given recipeId
  getInstructionsData(recipeId: number) {
    this.dataService
      .getInstructions(recipeId)
      .subscribe((instructions) => (this.instructions = instructions));
  }

  // get formatted string of cookTime
  formatCookTime(minutes?: number): string {
    if (!minutes) return '';
    if (minutes < 60) return `${minutes} minutes`;
    return `${Math.floor(minutes / 60)} hours and ${minutes % 60} minutes`;
  }
}
