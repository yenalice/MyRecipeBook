import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPageComponent } from './pages/add/add-page/add-page.component';
import { DetailsPageComponent } from './pages/details/details-page/details-page.component';
import { ViewAllPageComponent } from './pages/view-all/view-all-page/view-all-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPageComponent,
    DetailsPageComponent,
    ViewAllPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
