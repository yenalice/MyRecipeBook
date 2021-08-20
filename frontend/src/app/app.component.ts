import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'MyRecipeBook';
  currUser?: string;

  constructor(private cookieService: CookieService) {
    this.currUser = this.cookieService.get('UserId');
  }
}
