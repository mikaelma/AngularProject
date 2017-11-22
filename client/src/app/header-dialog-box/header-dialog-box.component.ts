import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-header-dialog-box',
  templateUrl: './header-dialog-box.component.html',
  styleUrls: ['./header-dialog-box.component.css'],
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

  submitLogin(value: Object): void {
    this.dialogRefLogin.close(value)
  }
}
