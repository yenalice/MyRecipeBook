import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  passwordError: boolean = false;

  usernameControl = new FormControl(this.username, Validators.required);
  passwordControl = new FormControl(this.password, Validators.required);

  constructor(
    private dataService: DataService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // log user in if username & password combo is valid
  onSubmit(username: string, password: string): void {
    if (
      this.usernameControl.errors != null ||
      this.passwordControl.errors != null
    )
      return;

    this.dataService
      .validateUser(this.username, this.password)
      .subscribe((data) => {
        if (data.success == true) {
          this.passwordError = false;
          console.log(data.user);
          this.cookieService.set('User', JSON.stringify(data.user));
          this.router.navigateByUrl('/');
        } else {
          this.passwordError = true;
        }
      });
  }

  // set username
  setUsername(event: Event): void {
    this.username = (event.target as HTMLInputElement).value;
  }

  // set password
  setPassword(event: Event): void {
    this.password = (event.target as HTMLInputElement).value;
  }
}
