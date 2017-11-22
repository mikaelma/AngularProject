import {Injectable} from '@angular/core';
import {Drink, Ingredient} from './drink';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from './jwthelper.service'
import {of} from 'rxjs/observable/of';

@Injectable()
export class DrinkService {
  constructor(private http: HttpClient, private jwt: JwtHelperService) {
  }

  drinks: Drink[] = [];

  /**
   * Method for getting drinks from the database.
   * @param skip how many drinks we should skip. 
   * Used to dynamically fetch drinks from the db.
   */
  getDrinks(skip: number): Observable<Drink[]> {
    let self = this;

    return self.http.get<any>('/drinks/' + skip).map(res => {
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
      return drinks;
    })
  }

  /**
   * Method for getting the drinks
   * the logged in user has created.
   */
  getCreatedDrinks(): Observable<Drink[]> {
    let self = this;
    let token = localStorage.getItem("token");
    if (!token) throw new Error("Could not find any token");
    let header = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    return self.http.get<any>('/createdDrinks', {headers: header}).map((res) => {
      let drinks = new Array<Drink>();
      for (let item of res) {
        let ingredients = new Array<Ingredient>();
        for (let ingredient of item.ingredients) {
          ingredients.push(new Ingredient(ingredient.quantity, ingredient.measure, ingredient.name));
        }
        drinks.push(new Drink(item._id, item.name, ingredients, item.authorId, item.authorName, item.description, item.image, item.glass, item.recipe));
      }
      return drinks;
    })
  }

  /**
   * Method for adding new drinks to the database.
   * @param drink the drink object to add to the db
   */
  addDrink(drink: Drink): Observable<any> {
    let self = this;
    let token = localStorage.getItem("token");
    if (!token) throw new Error("Could not find any token");
    let header = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    return Observable.create(observer => {
      self.http.post<any>('/drink', drink, {headers: header}).subscribe((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          observer.next(self.jwt.decodeToken(res.token));
          observer.complete();
        } else {
          observer.error(new Error("Could not post, servered returned " + res));
          observer.complete();
        }
      });
    });
  }

  /**
   * Method for marking a drink as favorite.
   * @param id the ID of the drink to favorite.
   * @param isAdd Boolean for either adding or
   * removing the drink from favorites.
   */
  favouriteDrink(id: string, isAdd: boolean): Observable<any> {
    let self = this;
    let token = localStorage.getItem("token");
    if (!token) throw new Error("Could not find any token");
    let header = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
    let body = {
      id: id,
      isAdd: isAdd
    };
    return Observable.create(observer => {
      self.http.post<any>('/favouriteDrink', body, {headers: header}).subscribe((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          observer.next(self.jwt.decodeToken(res.token));
          observer.complete();
        } else {
          observer.error(new Error("Could not post, servered returned " + res));
          observer.complete();
        }
      });
    });
  }

  /**
   * Method for recieving a specific drink
   * from the database.
   * @param id ID of the drink to get
   */
  getDrink(id: string): Observable<Drink> {
    let self = this;
    return self.http.get<any>('/findDrink/' + id).map(res => {
      let ingredients = new Array<Ingredient>();
      for (let item of res.ingredients) {
        ingredients.push(new Ingredient(item.quantity, item.measure, item.name));
      }
      return new Drink(res._id, res.name, ingredients, res.authorId, res.authorName, res.description, res.image
        , res.glass, res.recipe);
    });
  }

  /**
   * Get all the favorite drinks for
   * the logged in user.
   */
  getFavouriteDrinks():Observable<Drink[]>{
    let self = this;
    let token = localStorage.getItem("token");
    if(!token) throw new Error("Could not find any token");
    let header=new HttpHeaders(
      {'Content-Type': 'application/json',
        'Authorization':'Bearer '+ token
      });
    return self.http.get<any>('/getFavouriteDrinks', {headers:header}).map((res)=>{
      let drinks = new Array<Drink>();
      for(let item of res){
        let ingredients = new Array<Ingredient>();
        for(let ingredient of item.ingredients){
          ingredients.push(new Ingredient(ingredient.quantity,ingredient.measure,ingredient.name));
        }
        drinks.push(new Drink(item._id,item.name,ingredients,item.authorId,item.authorName,item.description,item.image,item.glass,item.recipe));
      }
      return drinks;
    })
  }

  /**
   * Method for searching for a drink
   * with a specific name
   * @param name Name of drink 
   */
  searchDrink(name: string): Observable<Drink[]> {
    let self = this;
    return self.http.get<any>('/searchDrinks/' + name).map(res => {
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
      return drinks;
    })
  }
}
