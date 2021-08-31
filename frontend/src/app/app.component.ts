import { Component } from '@angular/core';
import { User } from './models/user';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'MyRecipeBook';
  currUser?: User;

  constructor(private cookieService: CookieService) {
    if (cookieService.get('User'))
      this.currUser = JSON.parse(cookieService.get('User'));
  }
}
