import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.less'],
})
export class SignUpComponent implements OnInit {
  email: string = '';
  username: string = '';
  password: string = '';
  passwordError: boolean = false;

  emailControl = new FormControl(this.email, Validators.required);
  usernameControl = new FormControl(this.username, Validators.required);
  passwordControl = new FormControl(this.password, Validators.required);

  constructor(public dataService: DataService) {}

  ngOnInit(): void {}

  // save user to database
  onSubmit(username: string, password: string): void {
    if (
      this.emailControl.errors != null ||
      this.usernameControl.errors != null ||
      this.passwordControl.errors != null
    )
      return;
    // TODO: check if email/username is already taken
    this.addUser();
  }

  // set username
  setEmail(event: Event): void {
    this.email = (event.target as HTMLInputElement).value;
  }

  // set username
  setUsername(event: Event): void {
    this.username = (event.target as HTMLInputElement).value;
  }

  // set password
  setPassword(event: Event): void {
    this.password = (event.target as HTMLInputElement).value;
  }

  // add user
  addUser(): void {
    const newUser = {
      email: this.email,
      username: this.username,
      password: this.password,
    };
    this.dataService.addUser(newUser).subscribe();
  }
}
