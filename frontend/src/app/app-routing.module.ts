import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from './pages/add/add-page.component';
import { DetailsPageComponent } from './pages/detail/details-page.component';
import { ViewAllPageComponent } from './pages/view-all/view-all-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: ViewAllPageComponent, pathMatch: 'full' },
  { path: 'recipe/add', component: AddPageComponent, pathMatch: 'full' },
  { path: 'recipe/:recipeId', component: DetailsPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
