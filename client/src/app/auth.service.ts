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
      this.http.post<any>('/user',{user:user,password:password}).subscribe(res=>{ // Could create a class for this, but probably more boiler than profit, <any> works fine
        if(res.token!=null){
          localStorage.setItem("token",res.token);
          observer.next();
          observer.complete();
        }else if(res.error){
          observer.error(new Error("No token provided in response: "+res.error));
          observer.complete();
        }
      }) 
    });
  }

  loginUser(email:string,password:string):Observable<Object>{
    let self = this;
    let obj = {
      email:email,
      password:password
    }
    return Observable.create((observer)=>{
      self.http.post<any>('/login',obj).subscribe((res)=>{
        localStorage.setItem("token",res.token);

        observer.next(self.jwt.decodeToken(res.token));
        observer.complete();
      });
    });
  }



  verifyToken():Observable<any>{
    let self  = this;
    let token = localStorage.getItem("token");
    if(!token) throw new Error("Could not find any token");
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
          observer.error(new Error("Could not authorize"));
          observer.complete();
        }
      });
    });
  }
}
