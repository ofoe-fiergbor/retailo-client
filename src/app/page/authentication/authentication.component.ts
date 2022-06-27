import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  displayLoginForm = false;
  errorMessage?: string;

  constructor(
  ) {}

  ngOnInit(): void {}

  showLoginForm() {
    this.displayLoginForm = true;
    this.resetErrorMessage();
  }
  showRegisterForm() {
    this.displayLoginForm = false;
    this.resetErrorMessage();
  }
  resetErrorMessage() {
    this.errorMessage = undefined;
  }

}
