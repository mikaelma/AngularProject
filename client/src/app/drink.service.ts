import { Injectable } from '@angular/core';
import { Drink, Ingredient } from './drink';
import {Observable} from 'rxjs/Observable';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from './jwthelper.service'
import { of } from 'rxjs/observable/of';


//DRINK SERVICE
//FOR NOW IT GETS DRINKS FROM MOCK DRINKS TO SERVE TO OTHER COMPONENTS.

@Injectable()
export class DrinkService {
  constructor(private http:HttpClient,private jwt:JwtHelperService){}
  drinks:Drink[] = [];
  getDrinks(): Observable<Drink[]>{
    //return DRINKS;

    //subscribe
    //return observable with drinks
    let self = this;
    return self.http.get<any>('/drinks').map(res => {

      console.log("inne")

      let drinks = new Array<Drink>();
      for (let drink of res) {
        let ingredients = new Array<Ingredient>();
        for (let ingredient of drink.ingredients) {
          ingredients.push(new Ingredient(
            ingredient.quantity,
            ingredient.measure,
            ingredient.name
          ))
        }

        drinks.push(new Drink(
          drink._id,
          drink.name,
          ingredients,
          drink.authorId,
          drink.authorName,
          drink.description,
          drink.image,
          drink.glass,
          drink.recipe
        ))
      }
      this.drinks = drinks;
      console.log(this.drinks);
      return drinks;
    })
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

  getDrink(id: string): Observable<Drink>{
    console.log(id);
    let self = this;
    return self.http.get<any>('/drinks/'+id).map(res =>{
      let ingredients = new Array<Ingredient>();
      for(let item of res.ingredients){
        ingredients.push(new Ingredient(item.quantity,item.measure,item.name));
      }
      return new Drink(res._id,res.name,ingredients,res.authorId,res.authorName,res.description,res.image
      ,res.glass,res.recipe);
    });
  }
}
