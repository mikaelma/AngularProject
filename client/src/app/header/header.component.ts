import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {HeaderDialogBoxComponent} from '../header-dialog-box/header-dialog-box.component';
import {HeaderRegisterDialogBoxComponent} from '../header-register-dialog-box/header-register-dialog-box.component';
import {AuthService} from '../auth.service';
import {User} from '../user';
import {Observable} from 'rxjs/Observable'
import {JwtHelperService} from '../jwthelper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

  loginDisplayName:string;
  loginEmail: string;
  loginPassword: string;
  isLoggedIn:boolean;

  firstname: string;
  surname: string;
  registerEmail: string;
  registerPassword: string;

  constructor(public dialog: MatDialog,private auth:AuthService,private jwt:JwtHelperService) { }

  openDialogLogin(): void {
    let self = this;
    let dialogRefLogin= this.dialog.open(HeaderDialogBoxComponent, {
      width: '250px',
      data: {loginEmail: this.loginEmail, loginPassword: this.loginPassword}
    });

    dialogRefLogin.afterClosed().subscribe(result => {
      try {
        self.auth.loginUser(result.email, result.password).subscribe((user) => {
          self.isLoggedIn = true;
          self.loginDisplayName = user.firstName + " " + user.lastName;
        });
      } catch (e) {
        //TODO: Return some message to the user, for example unknown account / password
        console.log(e);
      }
    });
  }

  ngOnInit(){
    let self = this;
    try{
      self.auth.verifyToken().subscribe((res)=>{
        if(res){
          let token = self.jwt.decodeToken(localStorage.getItem("token"));
          self.loginDisplayName = token.firstName+" "+token.lastName
          self.isLoggedIn = true;
        }else{
          console.log("Could probably not find any tok")
        }
      });
    }catch(e){
      console.log(e);
      console.log("No token found in localstorage, probably because the user is not logged in");
    }
  }

  handleError(error):Observable<Error>{
    return Observable.throw(new Error("Having some troubles finding token"));
  }

  logout(){
    let self = this;
    self.isLoggedIn = false;
    localStorage.removeItem("token");
    self.loginDisplayName = ""
    console.log("Called logout");
  }

  openDialogRegister(): void {
    let self = this;
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
      let registerObject = {
        firstName:result.firstname,
        lastName:result.surname,
        email:result.registerEmail,
      }
      try{
        self.auth.registerUser(new User(result.firstname,result.surname,result.email),result.confirmPassword)
        .subscribe((res)=>{
          let user = self.jwt.decodeToken(localStorage.getItem("token"));
          self.loginDisplayName = user.firstName +" "+user.lastName;
        });
      }catch(e){
        //TODO: Return some message to the user indicating that registration failed
        console.log(e);
      }
    });
  }
}
