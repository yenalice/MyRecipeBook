import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
})
export class NavbarComponent implements OnInit {
  faBars = faBars;
  faUser = faUser;
  currUser?: User;
  @Output() openNav = new EventEmitter();

  constructor(private cookieService: CookieService, private router: Router) {
    if (cookieService.get('User'))
      this.currUser = JSON.parse(cookieService.get('User'));
  }

  ngOnInit(): void {}

  // redirect to user page
  navigateToUserPage() {
    this.router.navigateByUrl(`/user/${this.currUser?.userId}`);
  }

  // log user out
  logout(): void {
    this.cookieService.delete('User');
    this.router.navigateByUrl('/');
  }
}
