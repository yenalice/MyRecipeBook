import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPageComponent } from './pages/add/add-page.component';
import { DetailsPageComponent as DetailsComponent } from './pages/detail/details-page.component';
import { ViewAllPageComponent } from './pages/view-all/view-all-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { FavoritesComponent as Favorites } from './pages/favorites/favorites.component';

const routes: Routes = [
  { path: '', component: ViewAllPageComponent, pathMatch: 'full' },
  { path: 'recipe/add', component: AddPageComponent, pathMatch: 'full' },
  { path: 'recipe/:recipeId', component: DetailsComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignUpComponent, pathMatch: 'full' },
  { path: 'user/:userId', component: UserInfoComponent, pathMatch: 'full' },
  { path: 'favorite/:userId', component: Favorites, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
