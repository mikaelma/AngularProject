import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Drink,Ingredient} from '../app/drink';

@Injectable()
export class MockDrink{
    drinks:Array<Drink>
    constructor(){
        
    }

    

    getDrinks(skip:number):Observable<Drink[]>{
        let self = this;
        let drinks = new Array<Drink>();
        let ingredientNegroni = new Array<Ingredient>();
        let ingredientManhattan = new Array<Ingredient>();
        ingredientNegroni.push(new Ingredient(2,"cl","Gin"));
        ingredientNegroni.push(new Ingredient(2,"cl","Campari"));
        ingredientNegroni.push(new Ingredient(2,"cl","Vermut"));
        ingredientManhattan.push(new Ingredient(4,'cl','Rye Whisky'));
        ingredientManhattan.push(new Ingredient(1,'spoon',"Angostura Bitters"));
        drinks.push(new Drink('0','Negroni',ingredientNegroni,'0',"Test Testersen","Nice",'https://karanewman.files.wordpress.com/2012/02/negroni.jpg','Rocks','Stir everything in glass, garnish with orange'));
        drinks.push(new Drink('1','Manhattan',ingredientManhattan,'0',"Test Testersen","Nice",'https://cdn.diffordsguide.com/contrib/stock-images/2016/4/33/2016b6c73079e3757e1b704ec34776378632.jpg','Rocks','Stir everything in glass, garnish with orange'));
        return Observable.create((observer)=>{
            
           observer.next(drinks);
           observer.complete();           
        });
    }

    getDrink(id:number):Observable<Drink>{
        let self = this;
        let drinks = new Array<Drink>();
        let ingredientNegroni = new Array<Ingredient>();
        let ingredientManhattan = new Array<Ingredient>();
        ingredientNegroni.push(new Ingredient(2,"cl","Gin"));
        ingredientNegroni.push(new Ingredient(2,"cl","Campari"));
        ingredientNegroni.push(new Ingredient(2,"cl","Vermut"));
        ingredientManhattan.push(new Ingredient(4,'cl','Rye Whisky'));
        ingredientManhattan.push(new Ingredient(1,'spoon',"Angostura Bitters"));
        drinks.push(new Drink('0','Negroni',ingredientNegroni,'0',"Test Testersen","Nice",'https://karanewman.files.wordpress.com/2012/02/negroni.jpg','Rocks','Stir everything in glass, garnish with orange'));
        drinks.push(new Drink('1','Manhattan',ingredientManhattan,'0',"Test Testersen","Nice",'https://cdn.diffordsguide.com/contrib/stock-images/2016/4/33/2016b6c73079e3757e1b704ec34776378632.jpg','Rocks','Stir everything in glass, garnish with orange'));


        return Observable.create((observer)=>{
            observer.next(drinks[0]);
            observer.complete();
        });
    }

    getCreatedDrinks():Observable<Drink[]>{
        let self = this;
        let drinks = new Array<Drink>();
        let ingredientNegroni = new Array<Ingredient>();
        let ingredientManhattan = new Array<Ingredient>();
        ingredientNegroni.push(new Ingredient(2,"cl","Gin"));
        ingredientNegroni.push(new Ingredient(2,"cl","Campari"));
        ingredientNegroni.push(new Ingredient(2,"cl","Vermut"));
        ingredientManhattan.push(new Ingredient(4,'cl','Rye Whisky'));
        ingredientManhattan.push(new Ingredient(1,'spoon',"Angostura Bitters"));
        drinks.push(new Drink('0','Negroni',ingredientNegroni,'0',"Test Testersen","Nice",'https://karanewman.files.wordpress.com/2012/02/negroni.jpg','Rocks','Stir everything in glass, garnish with orange'));
        drinks.push(new Drink('1','Manhattan',ingredientManhattan,'0',"Test Testersen","Nice",'https://cdn.diffordsguide.com/contrib/stock-images/2016/4/33/2016b6c73079e3757e1b704ec34776378632.jpg','Rocks','Stir everything in glass, garnish with orange'));
        return Observable.create(observer=>{
            observer.next(drinks);
            observer.complete();
        });
    }

    getFavouriteDrinks():Observable<Drink[]>{
        let self = this;
        let drinks = new Array<Drink>();
        let ingredientNegroni = new Array<Ingredient>();
        let ingredientManhattan = new Array<Ingredient>();
        ingredientNegroni.push(new Ingredient(2,"cl","Gin"));
        ingredientNegroni.push(new Ingredient(2,"cl","Campari"));
        ingredientNegroni.push(new Ingredient(2,"cl","Vermut"));
        ingredientManhattan.push(new Ingredient(4,'cl','Rye Whisky'));
        ingredientManhattan.push(new Ingredient(1,'spoon',"Angostura Bitters"));
        drinks.push(new Drink('0','Negroni',ingredientNegroni,'0',"Test Testersen","Nice",'https://karanewman.files.wordpress.com/2012/02/negroni.jpg','Rocks','Stir everything in glass, garnish with orange'));
        drinks.push(new Drink('1','Manhattan',ingredientManhattan,'0',"Test Testersen","Nice",'https://cdn.diffordsguide.com/contrib/stock-images/2016/4/33/2016b6c73079e3757e1b704ec34776378632.jpg','Rocks','Stir everything in glass, garnish with orange'));
        return Observable.create(observer=>{
            observer.next(drinks);
            observer.complete();
        });
    }
    
    addDrink(drink: Drink): Observable<any> {
        let self = this;
        let token = localStorage.getItem("token");
        if (!token) throw new Error("Could not find any token");
 
        return Observable.create(observer => {
          observer.next({test:"test"});
          observer.complete();
        });
      }

}