import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from './pages/add/add-page/add-page.component';
import { DetailsPageComponent } from './pages/detail/details-page/details-page.component';
import { ViewAllPageComponent } from './pages/view-all/view-all-page/view-all-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: ViewAllPageComponent },
  /* QUESTION: is there any way to verify that some route is a recipe title and not just some random string?? */
  { path: ':RecipeTitle', component: DetailsPageComponent },
  { path: 'add', component: AddPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
