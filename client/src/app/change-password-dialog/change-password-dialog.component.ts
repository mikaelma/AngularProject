import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

/** A function for checking if the two passwords from the changePassword-form are the same.t**/
function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): { [key: string]: any } => {
    let newPassword = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];

    if (newPassword.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  }
}

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent {
  hide = true;
  newPasswordForm: FormGroup;

  constructor(public dialogRefRegister: MatDialogRef<ChangePasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public builder: FormBuilder) {


    this.newPasswordForm = builder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      confirmPassword: ['', Validators.required]
    }, {validator: matchingPasswords('newPassword', 'confirmPassword')})
  }

  /** Submits the values from the changePassword-form to the .afterClosed() in the myPage-component**/
  submitRegistration(value: Object): void {
    this.dialogRefRegister.close(value)
  }
}
