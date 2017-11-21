import {Component, OnInit} from '@angular/core';
import {DrinkService} from '../drink.service';
import {Drink} from '../drink';
import {Router} from '@angular/router/';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-my-page-drink-list',
  templateUrl: './my-page-drink-list.component.html',
  styleUrls: ['./my-page-drink-list.component.css']
})
export class MyPageDrinkListComponent implements OnInit {

  drinks: Drink[] = [];

  constructor(private drinkService: DrinkService,
              private router: Router){}

  /**
   * Calls drinkservice to retrieve drinks from database.
   */
  getCreatedDrinks(): void {
    this.drinkService.getCreatedDrinks()
      .subscribe((drinks: Drink[])=>{
      this.drinks = drinks;
      this.sortArray(this.drinks);
    });
  }


  /**
   * Sorts array by the name of the drink.
   * @param array
   */

  sortArray(array){
    array.sort(function(a, b){
      let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
      if (nameA < nameB) //sort string ascending
        return -1;
      if (nameA > nameB)
        return 1;
      return 0; //default return value (no sorting)
    })
  }

  /**
   * After pressing on a listitem this method navigates the user to a detailed information about the drink
   * @param id
   */
  navigateToDrink(id){
    this.router.navigate(['/drink',id])
  }


  /**
   * This method gets called when the component is initialized.
   * Starts with using the getDrinks() method.
   */
  ngOnInit() {
    this.getCreatedDrinks();
  }
}
