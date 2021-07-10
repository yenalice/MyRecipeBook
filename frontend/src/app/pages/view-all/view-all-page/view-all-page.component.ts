import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { Recipe } from '../../../models/recipe';

@Component({
  selector: 'app-view-all-page',
  templateUrl: './view-all-page.component.html',
  styleUrls: ['./view-all-page.component.less'],
})
export class ViewAllPageComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.dataService
      .getRecipes()
      .subscribe((recipes) => (this.recipes = recipes));
  }
}
