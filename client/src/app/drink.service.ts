import { Injectable } from '@angular/core';
import { Drink } from './drink';
import { DRINKS } from './drink/mock-drinks';

import {Observable} from 'rxjs/Observable';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from './jwthelper.service'
import { of } from 'rxjs/observable/of';


//DRINK SERVICE
//FOR NOW IT GETS DRINKS FROM MOCK DRINKS TO SERVE TO OTHER COMPONENTS.

@Injectable()
export class DrinkService {
  constructor(private http:HttpClient,private jwt:JwtHelperService){}

  getDrinks(): Drink[] {
    return DRINKS;

    //subscribe
    //return observable with drinks

  }

  
  addDrink(drink:Drink):Observable<any>{
    let self  = this;
    let token = localStorage.getItem("token");
    if(!token) throw new Error("Could not find any token");
    let header = new HttpHeaders(
      {'Content-Type': 'application/json',
      'Authorization':'Bearer '+ token
    });
    return Observable.create(observer=>{
      self.http.post<any>('/drinks',drink,{headers:header}).subscribe((res)=>{
        if(res.token){
          localStorage.setItem("token",res.token);
          observer.next(self.jwt.decodeToken(res.token));
          observer.complete();
        }else{
          observer.error(new Error("Could not post, servered returned "+res));
          observer.complete();
        }
      });
    });
  }

  getDrink(id: number): Observable<Drink>{
    return of(DRINKS.find(drink => drink.id === id));
  }
}
