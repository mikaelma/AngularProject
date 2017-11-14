import { Injectable } from '@angular/core';
import { Drink } from './drink';
import { DRINKS } from './drink/mock-drinks';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

//DRINK SERVICE
//FOR NOW IT GETS DRINKS FROM MOCK DRINKS TO SERVE TO OTHER COMPONENTS.

@Injectable()
export class DrinkService {

  getDrinks(): Drink[] {
    return DRINKS;
  }

  getDrink(id: number): Observable<Drink>{

    return of(DRINKS.find(drink => drink.id === id));

  }
}
