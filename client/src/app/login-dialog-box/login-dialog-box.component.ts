import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-login-dialog-box',
  templateUrl: './login-dialog-box.component.html',
  styleUrls: ['./login-dialog-box.component.css'],
})
export class HeaderDialogBoxComponent {
  hide = true;
  loginForm: FormGroup;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRefLogin: MatDialogRef<HeaderDialogBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public builder: FormBuilder) {

    this.loginForm=this.builder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
      })
  }

  /** Submits the values from the login-form to the .afterClosed() in the header-component**/
  submitLogin(value: Object): void {
    this.dialogRefLogin.close(value)
  }
}
