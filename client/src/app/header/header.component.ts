import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HeaderDialogBoxComponent} from '../header-dialog-box/header-dialog-box.component';
import {HeaderRegisterDialogBoxComponent} from '../header-register-dialog-box/header-register-dialog-box.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent{

  loginEmail: string;
  loginPassword: string;

  firstname: string;
  surname: string;
  registerEmail: string;
  registerPassword: string;

  constructor(public dialog: MatDialog) { }

  openDialogLogin(): void {
    let dialogRefLogin= this.dialog.open(HeaderDialogBoxComponent, {
      width: '250px',
      data: {loginEmail: this.loginEmail, loginPassword: this.loginPassword}
    });

    dialogRefLogin.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogRegister(): void {
    let dialogRefRegister= this.dialog.open(HeaderRegisterDialogBoxComponent, {
      width: '250px',
      data: {
        firstname: this.firstname,
        surname: this.surname,
        registerEmail: this.registerEmail,
        registerPassword: this.registerPassword}
    });

    dialogRefRegister.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
