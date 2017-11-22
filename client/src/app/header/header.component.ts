import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {HeaderDialogBoxComponent} from '../login-dialog-box/login-dialog-box.component';
import {HeaderRegisterDialogBoxComponent} from '../register-dialog-box/register-dialog-box.component';
import {AuthService} from '../auth.service';
import {User} from '../user';
import {Observable} from 'rxjs/Observable'
import {JwtHelperService} from '../jwthelper.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {

  loginDisplayName: string;
  loginEmail: string;
  loginPassword: string;
  isLoggedIn: boolean;
  firstname: string;
  surname: string;
  registerEmail: string;
  registerPassword: string;

  constructor(public dialog: MatDialog,
              private auth: AuthService,
              private jwt: JwtHelperService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }
/**This method open the login dialog box and handles the data which is put into it.
 * After the dialog is closed, if valid, the result is sent to auth.service **/
  openDialogLogin(): void {
    let self = this;
    let dialogRefLogin = this.dialog.open(HeaderDialogBoxComponent, {
      width: '250px',
      data: {loginEmail: this.loginEmail, loginPassword: this.loginPassword}
    });

    dialogRefLogin.afterClosed().subscribe(result => {
      self.auth.loginUser(result.email, result.password).subscribe((user) => {
        self.isLoggedIn = true;
        self.loginDisplayName = user.firstName + " " + user.lastName;
      }, (err) => {
        this.snackBar.open('Login failed:', 'Wrong username or password', {
          duration: 3500
        });
        console.log('err: ' + err);
      })
    });
  }

  /**
   * This method open the register dialog box and handles the data which is put into it.
   * After the dialog is closed, if valid, the result is sent to auth.service.
   * **/
  openDialogRegister(): void {
    let self = this;
    let dialogRefRegister = this.dialog.open(HeaderRegisterDialogBoxComponent, {
      width: '250px',
      data: {
        firstname: this.firstname,
        surname: this.surname,
        registerEmail: this.registerEmail,
        registerPassword: this.registerPassword
      }
    });

    dialogRefRegister.afterClosed().subscribe(result => {
      let registerObject = {
        firstName: result.firstname,
        lastName: result.surname,
        email: result.registerEmail,
      }

      self.auth.registerUser(new User(result.firstname, result.surname, result.email), result.confirmPassword)
        .subscribe((res) => {
          let user = self.jwt.decodeToken(localStorage.getItem("token"));
          self.isLoggedIn = true;
          self.loginDisplayName = user.firstName + " " + user.lastName;
        }, (err) => {
          this.snackBar.open('Registration failed:', 'Email is already registered', {
            duration: 3500
          });
          console.log(err);
        });
    });
  }

  /**
   * When the page initializes we verify the token
   * **/
  ngOnInit() {
    let self = this;
    try {
      self.auth.verifyToken().subscribe((res) => {
        if (res) {
          let token = self.jwt.decodeToken(localStorage.getItem("token"));
          self.loginDisplayName = token.firstName + " " + token.lastName
          self.isLoggedIn = true;
        } else {
          console.log("Could probably not find any token")
        }
      });
    } catch (e) {

    }
  }

  handleError(error): Observable<Error> {
    return Observable.throw(new Error("Having some troubles finding token"));
  }

  /** Handles when a user logs out, it removes the token. **/
  logout() {
    let self = this;
    self.isLoggedIn = false;
    localStorage.removeItem("token");
    self.loginDisplayName = ""
    console.log("Called logout");
  }

  redirect() {
    this.router.navigate(['./my-page'])
  }


}

