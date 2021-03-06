import { Injectable } from '@angular/core';
import {User} from './classes';
import {Observable} from 'rxjs/Observable';
import {JwtHelperService} from './jwthelper.service';
import {HttpClient,HttpResponse,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {} from '@auth0/angular-jwt'

@Injectable()
export class AuthService {

  constructor(private jwt:JwtHelperService, private http:HttpClient) { }

  /**
   * Method for registering a user.
   * @param {User} user
   * @param {string} password
   * @returns {Observable<Object>}
   */
  registerUser(user:User,password:string):Observable<Object>{
    let self = this;
    return Observable.create(observer=>{
      this.http.post<any>('/register',{user:user,password:password}).subscribe(res=>{ // Could create a class for this, but probably more boiler than profit, <any> works fine
        if(res.token!=null){
          localStorage.setItem("token",res.token);
          observer.next();
          observer.complete();
        }else if(res.status){
          observer.error(res);
          observer.complete();        }
      })
    });
  }

  /**
   * Method for updating an old password.
   * @param {string} newPassword
   * @param {string} oldPassword
   * @returns {Observable<any>}
   */
  updatePassword(newPassword: string, oldPassword: string): Observable<any>{
    let self  = this;
    return Observable.create(observer =>{
      let token = localStorage.getItem("token");
      if(!token){
        observer.error('Err i updatepassword');
        observer.complete();
      }
      let header=new HttpHeaders(
        {'Content-Type': 'application/json',
          'Authorization':'Bearer '+ token
        });
      self.http.post<any>('/passwordReset', {password: oldPassword, newPassword: newPassword},{headers: header})
      .subscribe((res)=>{
          if(res.token){
            localStorage.setItem('token', res.token);
            observer.next(self.jwt.decodeToken(res.token));
            observer.complete();
          }else{
            observer.error(res);
            observer.complete();
          }
        })
    })
  }

  /**
   * Method handeling login functionality.
   * @param {string} email
   * @param {string} password
   * @returns {Observable<User>}
   */
  loginUser(email:string,password:string):Observable<User>{
    let self = this;
    let obj = {
      email:email,
      password:password
    }
    return Observable.create((observer)=>{
      self.http.post<any>('/login',obj).subscribe((res)=>{
        if(res.status){
          observer.error(res);
          observer.complete();
        }else if(res.token){
          localStorage.setItem("token",res.token);
          console.log(localStorage.getItem("token"));
          let token = self.jwt.decodeToken(res.token);
          observer.next(new User(token.firstName,token.lastName,token.email,token.favouriteDrinks,token.createdDrinks));
          observer.complete();
        }
      },(error)=>{
        observer.error(error);
        observer.complete();
      });
    });
  }


  /**
   * Sends token to server which verify the signature.
   * @returns {Observable<Boolean>}
   */
  verifyToken():Observable<Boolean>{
    let self  = this;
    return Observable.create(observer=>{
      let token = localStorage.getItem("token");
      if(!token){
        observer.error(new Error("Could not find any token"));
        observer.complete();
        return;
      }
      let header=new HttpHeaders(
        {'Content-Type': 'application/json',
        'Authorization':'Bearer '+ token
      });

      self.http.get<any>("/authorize",{headers:header}).subscribe((res)=>{
        if(res.status==200){
          observer.next(true);
          observer.complete();
        }else{
          observer.error(false);
          observer.complete();
        }
      });
    });
  }
}
