import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-header-dialog-box',
  templateUrl: './header-dialog-box.component.html',
  styleUrls: ['./header-dialog-box.component.css'],
})
export class HeaderDialogBoxComponent {
  hide = true;
  email: string;
  password: string;

  emailFormControl= new FormControl('', [Validators.required, Validators.email]);

  constructor(public dialogRefLogin: MatDialogRef<HeaderDialogBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  getErrorMessage() {
    return this.emailFormControl.hasError('required') ? 'You must enter a value' :
      this.emailFormControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  closeDialog(){
   // var parsed = JSON.stringify(this.);
    let res = {
      email: this.email,
      password: this.password
    }
    console.log(res);
    this.dialogRefLogin.close(res);
  }
}
