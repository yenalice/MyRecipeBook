import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { AddPageComponent } from './pages/add/add-page/add-page.component';
import { DetailsPageComponent } from './pages/detail/details-page/details-page.component';
import { ViewAllPageComponent } from './pages/view-all/view-all-page/view-all-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

// services
import { DataService } from './services/data/data.service';
import { ApiInterceptor } from './interceptors/api-interceptor';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';

// fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    AddPageComponent,
    DetailsPageComponent,
    ViewAllPageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    FontAwesomeModule,
  ],
  providers: [
    DataService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
