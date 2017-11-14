import { Injectable } from '@angular/core';
import { Drink } from './drink';
import { DRINKS } from './drink/mock-drinks';

//DRINK SERVICE
//FOR NOW IT GETS DRINKS FROM MOCK DRINKS TO SERVE TO OTHER COMPONENTS.

@Injectable()
export class DrinkService {

  getDrinks(): Drink[] {
    return DRINKS;
  }
}
