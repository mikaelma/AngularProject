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

  registerUser(user:User,password:string):Observable<Object>{
    let self = this;
    return Observable.create(observer=>{
      this.http.post<any>('/register',{user:user,password:password}).subscribe(res=>{ // Could create a class for this, but probably more boiler than profit, <any> works fine
        if(res.token!=null){
          localStorage.setItem("token",res.token);
          observer.next();
          observer.complete();
        }else if(res.error){
          throw new Error("Server could not register user: "+res.message);
        }
      })
    });
  }
  

  loginUser(email:string,password:string):Observable<User>{
    let self = this;
    let obj = {
      email:email,
      password:password
    }
    return Observable.create((observer)=>{
      self.http.post<any>('/login',obj).subscribe((res)=>{
        if(res.status==403){
          throw new Error("Unauthorized access");
        }
        localStorage.setItem("token",res.token);
        console.log(localStorage.getItem("token"));
        let token = self.jwt.decodeToken(res.token);
        observer.next(new User(token.firstName,token.lastName,token.email,token.favouriteDrinks,token.createdDrinks));
        observer.complete();
      });
    });
  }



  verifyToken():Observable<Boolean>{
    let self  = this;
    let token = localStorage.getItem("token");
    if(!token){
      console.log("NO TOKEN:(");
      throw new Error("Could not find any token");
    }
    let header=new HttpHeaders(
      {'Content-Type': 'application/json',
      'Authorization':'Bearer '+ token
    });
    return Observable.create(observer=>{
      self.http.get<any>("/authorize",{headers:header}).subscribe((res)=>{
        if(res.status==200){
          observer.next(true);
          observer.complete();
        }else{
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
