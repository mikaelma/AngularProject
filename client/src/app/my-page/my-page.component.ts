import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../user';
import {JwtHelperService} from '../jwthelper.service';
import {MatDialog} from "@angular/material";
import {ChangePasswordDialogComponent} from "../change-password-dialog/change-password-dialog.component";
import {Drink} from "../drink";
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {
  user: User;
  oldPassword: string;
  updatedPassword: string;


  constructor(public dialog: MatDialog, private jwt: JwtHelperService, private auth:AuthService) { }

  ngOnInit() {
    let token = 'token';
    let userObject = this.jwt.decodeToken(localStorage.getItem(token));
    this.user = new User(
      userObject.firstName,
      userObject.lastName,
      userObject.email,
      userObject.favouriteDrinks,
      userObject.createdDrinks)
  }

  openDialog(): void {
    let self = this;
    let dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '250px',
      data: {oldPassword: this.oldPassword, updatedPassword: this.updatedPassword}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      let passwordObject ={
        oldPassword: result.oldPassword,
        newPassword: result.newPassword
      }
        self.auth.updatePassword(result.newPassword, result.oldPassword)
          .subscribe((res)=>{
          console.log(res);
        }, (err)=>{
            console.log(err);
          })

    });
  }
}
