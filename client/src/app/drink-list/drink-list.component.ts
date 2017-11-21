import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../drink.service';
import { Drink } from '../drink';
import { Router } from '@angular/router/';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css'],
})

export class DrinkListComponent implements OnInit {
  //Throttle for infinite scroll
  throttle = 300;
  //Distance from the bottom when the scroll starts
  scrollDistance = 0.5;
  //How many records the db should skip when loading more drinks on scroll
  skip = 0;
  //Drink array
  drinks: Drink[] = [];
  //Categories and types of glass used in the dropdown
  typesOfAcohol = ['Brandy', 'Gin', 'Rum', 'Tequila', 'Vodka', 'Whiskey'];
  typesOfGlass = ['Cocktail', 'Highball', 'Rocks', 'Shot'];
  sortBy = 'name';

  constructor(
    private drinkService: DrinkService,
    private router: Router){}

  /**
   * Calls drinkservice to retrieve drinks from database.
   */
  getDrinks(): void {
    //Gets drinks from drinkservice. the 0 indicates to not skip any records.
    this.drinkService.getDrinks(0)
      .subscribe(
        (drinks: Drink[]) => {
          this.drinks = drinks;
          this.sortArray(this.drinks);
        }
      );
  }

  /**
   * Sorts array by the name of the drink.
   * @param array
   */
  sortArray(array){
    if (this.sortBy === 'name'){
      array.sort(function(a, b){
        let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0; //default return value (no sorting)
      })
    } else {
      array.sort(function(a, b){
        let nameA=a.authorName.toLowerCase(), nameB=b.authorName.toLowerCase()
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0; //default return value (no sorting)
      })
    }
  }

  /**
   * After pressing on a listitem this method navigates the user to a detailed information about the drink
   * @param id
   */
  navigateToDrink(id){
      this.router.navigate(['/drink',id])
  }

  /**
   * Gets called when the user scrolls almost to the bottom of the page
   * When called it increments total records to skip so that it always fetches 12 new records at the time.
   * @param ev
   */
  onScrollDown (ev) {
    this.skip = this.skip += 12;
    this.drinkService.getDrinks(this.skip)
      .subscribe(
        (drinks: Drink[]) => {
          this.drinks.push.apply(this.drinks, drinks);
          this.sortArray(this.drinks);
        }
      );
  }

  /**
   * Realtime search for drinks.
   * If the user has typed more than 3 letters it will check the db to see if it can find any records.
   * if total letters is less than 3 it will just get the 12 first records from db.
   * @param e
   */
  searchDrink(e){
    if (e.target.value.length > 2){
      this.drinkService.searchDrink(e.target.value)
        .subscribe(
          (drinks: Drink[]) => {
            this.drinks = drinks;
            this.sortArray(this.drinks);
          }
        )
    } else {
      this.skip = 0;
      this.getDrinks();
    }
  }

  changeSort(e){
    this.sortBy = e.value;
    this.sortArray(this.drinks);
  }

  /**
   * This method gets called when the component is initialized.
   * Starts with using the getDrinks() method.
   */
  ngOnInit(){
    this.getDrinks();
  }
}
