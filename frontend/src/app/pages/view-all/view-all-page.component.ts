import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data/data.service';
import { Recipe } from './../../models/recipe';
import { faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ConfirmDeleteComponent } from './../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-view-all-page',
  templateUrl: './view-all-page.component.html',
  styleUrls: ['./view-all-page.component.less'],
})
export class ViewAllPageComponent implements OnInit {
  recipes: Recipe[] = [];
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getData();
  }

  // show delete button on hover
  // do this last so that i can check spacing between all the buttons
  onShowDelete(event: Event): void {}

  // delete on click of button
  onDelete(event: Event, recipeId: number): void {
    event.stopPropagation();
    if (this.confirmDelete()) this.deleteData(recipeId);
    // TODO: make sure casacde is on so we can cascade delete
  }

  // open dialog confirming delete
  confirmDelete(): boolean {
    // TODO: implement dialog window
    /*
    let dialogRef = dialog.open(ConfirmDeleteComponent, {
      height: '400px',
      width: '600px',
    });
    */
    return true;
  }

  // get all recipes from data service
  getData(): void {
    this.dataService
      .getRecipes()
      .subscribe((recipes) => (this.recipes = recipes));
  }

  // call to data service to delete data
  deleteData(recipeId: number): void {
    this.dataService.deleteRecipe(recipeId).subscribe(() => this.getData());
  }
}
