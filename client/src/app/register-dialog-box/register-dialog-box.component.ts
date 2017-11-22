import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';


/**
 * A function for checking if the two passwords from the register-form are the same
 * **/
function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): { [key: string]: any } => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];

    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  }
}

@Component({
  selector: 'app-register-dialog-box',
  templateUrl: './register-dialog-box.component.html',
  styleUrls: ['./register-dialog-box.component.css'],
})
export class HeaderRegisterDialogBoxComponent {
  hide = true;
  registerForm: FormGroup;

  constructor(public dialogRefRegister: MatDialogRef<HeaderRegisterDialogBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public builder: FormBuilder) {

    this.registerForm = builder.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      confirmPassword: ['', Validators.required]
    }, {validator: matchingPasswords('password', 'confirmPassword')})
  }

  /** Submits the values from the register-form to the .afterClosed() in the header-component**/
  submitRegistration(value: Object): void {
    this.dialogRefRegister.close(value)
  }

}
