import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../user';
import {JwtHelperService} from '../jwthelper.service';
import {MatDialog, MatSnackBar} from "@angular/material";
import {ChangePasswordDialogComponent} from "../change-password-dialog/change-password-dialog.component";
import {Drink} from "../drink";
import {AuthService} from '../auth.service';
import {Router} from "@angular/router";
import {DrinkService} from "../drink.service";

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {
  user: User;
  oldPassword: string;
  updatedPassword: string;
  favouriteDrinks: Drink[] = [];


  constructor(
    public dialog: MatDialog,
    private jwt:JwtHelperService,
    private auth:AuthService,
    private drinkService: DrinkService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    let token = 'token';
    let userObject = this.jwt.decodeToken(localStorage.getItem(token));
    this.user = new User(
      userObject.firstName,
      userObject.lastName,
      userObject.email,
      userObject.favouriteDrinks,
      userObject.createdDrinks)
    this.getFavouriteDrinks();
  }

  /**
   * After pressing on a listitem this method navigates the user to a detailed information about the drink
   * @param id
   */
  navigateToDrink(id){
    this.router.navigate(['/drink',id])
  }

  /**
   * Calls drinkservice to retrieve favourite drinks from database.
   */
  getFavouriteDrinks(): void {
    this.drinkService.getFavouriteDrinks()
      .subscribe((drinks: Drink[])=>{
        this.favouriteDrinks = drinks;
      });
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
        self.auth.updatePassword(result.newPassword, result.oldPassword).subscribe((res)=>{
          this.snackBar.open('Successfully updated the password', '', {
            duration: 3500
          });
          console.log(res);
        }, (err)=>{
          this.snackBar.open('Updating password failed', '', {
            duration: 3500
          });
            console.log(err);
          })

    });
  }
}
