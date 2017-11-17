import { Injectable } from '@angular/core';
import { Drink,Ingredient} from './drink';
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

  getCreatedDrinks():Observable<Array<Drink>>{
    let self = this;
    let token = localStorage.getItem("token");
    if(!token) throw new Error("Could not find any token");
    let header=new HttpHeaders(
      {'Content-Type': 'application/json',
      'Authorization':'Bearer '+ token
    });
    return Observable.create(observer=>{
      self.http.get<Drink[]>('/createdDrinks').map((res)=>{
        let drinks = new Array<Drink>();
        for(let item of res){
          let ingredients = new Array<Ingredient>();
          for(let ingredient of item.ingredients){
            ingredients.push(new Ingredient(ingredient.quantity,ingredient.measure,ingredient.name));
          }
          drinks.push(new Drink(item.id,item.name,ingredients,item.author,item.description,item.image,item.glass,item.recipe));
          return drinks;
        }
      })
    });
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
      self.http.post<any>('/drink',drink,{headers:header}).subscribe((res)=>{
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

let drinks = new Array<Drink>();