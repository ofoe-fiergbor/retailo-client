import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/service/user/user.model';
import { UtilService } from 'src/app/service/util/util.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import {
  clearUserDetails,
  saveMerchantRequest,
} from 'src/app/state/auth/auth.action';
import { UserService } from 'src/app/service/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { updateUserDetails } from 'src/app/state/auth/auth.action';
import { MerchantRequestService } from 'src/app/service/merchant-request/merchant-request.service';
import { MerchantRequestModel } from 'src/app/service/merchant-request/merchant-request.model';
import { clearCategoryState } from 'src/app/state/category/category.action';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css'],
})
export class ProfileContentComponent implements OnInit {
  user?: UserModel;
  disableForms = true;
  nameInitials!: string;
  merchantRequest?: MerchantRequestModel;
  constructor(
    private util: UtilService,
    private store: Store<AppState>,
    private router: Router,
    private userService: UserService,
    private merchantRequestService: MerchantRequestService
  ) {}

  formGroup = new FormGroup({
    address: new FormControl(''),
    phone: new FormControl(''),
    pictureUrl: new FormControl('http://fpoimg.com/300x300?text=Hanselman'),
  });

  ngOnInit(): void {
    this.loadUserFromStore();
    this.loadUserFromStore();
  }

  loadUserFromStore() {
    const data = this.util.getUserDetails();
    this.user = data;
    this.setInitials(data?.firstName!, data?.lastName!);
  }

  loadMerchantRequestFromStore() {
    this.merchantRequest = this.util.getMerchantRequest();
  }

  updateProfile() {
    this.userService
      .updateUserProfile(this.formGroup.value, this.user?.id!)
      .subscribe(
        (response) => {
          this.store.dispatch(updateUserDetails(response));
          this.user = this.util.getUserDetails();
          this.freezeForms();
          this.util.openSnackBar('Account updated successfully!');
        },
        (error) =>
          this.util.openSnackBar(this.userService.errorMessage(error.status))
      );
  }

  requestToBeMerchant() {
    if (!this.isValidateMerchantRequest()) {
      this.util.openSnackBar(
        'You are required to provide your address, phone number and profile picture before being able to make a request.'
      );
      return;
    }
    this.merchantRequestService
      .makeMerchantRequest({ userId: this.user?.id! })
      .subscribe(
        (data) => {
          this.store.dispatch(saveMerchantRequest(data));
          this.loadUserFromStore();
          this.util.openSnackBar(
            'Request to be a merchant has been created successfully. The approval may take 3 - 5 business days'
          );
        },
        (error) => {
          if ((error.status = 409)) {
            this.util.openSnackBar(
              'You have already made a request to to be a merchant. Kindly wait for approval.'
            );
          } else {
            this.util.openSnackBar(
              'Sorry something went wrong, try again later.'
            );
          }
        }
      );
  }

  setInitials(firstName: string, lastName: string) {
    this.nameInitials = this.util.getUsersInitials(firstName, lastName);
  }

  freezeForms() {
    this.disableForms = true;
  }

  editProfile() {
    this.disableForms = false;
  }

  isValidateMerchantRequest(): boolean {
    // const requirements = {address: this.user?.address, phone: this.user?.phone, pictureUrl: this.user?.pictureUrl}

    // Object.entries(requirements).forEach(([_, value]) => {
    //   if(value !== undefined && value !== "") {
    //     return true
    //   }
    // })
    if (
      this.user?.address &&
      this.user?.phone &&
      this.user?.pictureUrl &&
      this.user?.address !== '' &&
      this.user?.phone !== '' &&
      this.user?.pictureUrl !== ''
    ) {
      return true;
    }
    return false;
  }

  logout() {
    this.store.dispatch(clearCategoryState());
    this.store.dispatch(clearUserDetails());
    this.router.navigate(['']);
  }
}
