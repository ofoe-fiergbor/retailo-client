import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { persistUserDetails } from 'src/app/state/auth/auth.action';
import { UtilService } from 'src/app/service/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  @Output() navigateToRegister = new EventEmitter();
  constructor(
    private userService: UserService,
    private store: Store<AppState>,
    private util: UtilService
  ) {}

  formGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {}

  handleFormSubmit() {
    this.userService.loginUser(this.formGroup.value).subscribe(
      (response) => {
        this.store.dispatch(persistUserDetails(response));
        this.resetForm();
        history.back();
      },
      (error) => {
        this.util.openSnackBar(this.userService.errorMessage(error.status))
      }
    );
  }

  resetForm() {
    this.formGroup.reset();
  }

}
