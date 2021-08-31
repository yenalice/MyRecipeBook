import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from './../../models/recipe';
import { faTrashAlt, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkClear } from '@fortawesome/free-regular-svg-icons';
import { ConfirmDeleteComponent } from './../confirm-delete/confirm-delete.component';
import { DataService } from './../../services/data/data.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.less'],
})
export class ListViewComponent implements OnInit {
  @Input() recipes: Recipe[] = [];
  faTrashAlt = faTrashAlt;
  faBookmarkClear = faBookmarkClear;
  faBookmark = faBookmark;
  @Output() refreshRecipes = new EventEmitter<string>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

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

  // call to data service to delete data
  deleteData(recipeId: number): void {
    this.dataService
      .deleteRecipe(recipeId)
      .subscribe(() => this.refreshRecipes.emit());
  }

  // add to user's favorites
  bookmarkRecipe(event: Event, recipeId: number): void {
    event.stopPropagation();
    this.dataService.addBookmark(recipeId).subscribe();
  }
}
