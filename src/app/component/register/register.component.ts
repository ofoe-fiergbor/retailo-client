import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() navigateToLogin = new EventEmitter();
  hide = true;
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  formGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {}

  handleFormSubmit() {
    this.userService.registerNewUser(this.formGroup.value).subscribe(
      () => {
        this.navigateToLogin.emit();
        this.resetForm();
      },
      (error) => this.openSnackBar(this.userService.errorMessage(error.status))
    );
  }

  resetForm() {
    this.formGroup.reset();
  }

  openSnackBar(message: string, action: string = 'Ok') {
    this.snackBar.open(message, action);
  }
}
