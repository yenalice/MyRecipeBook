import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { AppComponent } from './app.component';
import { AddPageComponent } from './pages/add/add-page.component';
import { DetailsPageComponent } from './pages/detail/details-page.component';
import { ViewAllPageComponent } from './pages/view-all/view-all-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

// services
import { DataService } from './services/data/data.service';
import { ApiInterceptor } from './interceptors/api-interceptor';
import { CookieService } from 'ngx-cookie-service';

// angular material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';

// fontawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './pages/login/login.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    AddPageComponent,
    DetailsPageComponent,
    ViewAllPageComponent,
    PageNotFoundComponent,
    NavbarComponent,
    LoginComponent,
    UserInfoComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatDialogModule,
    MatMenuModule,
    FontAwesomeModule,
  ],
  providers: [
    DataService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
