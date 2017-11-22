import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../drink.service';
import { Drink, Ingredient } from '../drink';
import { Router } from '@angular/router/';
import { DomSanitizer } from '@angular/platform-browser';

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
  //The current drinks
  drinks: Drink[] = [];
  //Holds the drinks that are filtered.
  filteredDrinks: Drink[] = [];
  //Holds all drinks for easier filtering.
  totalDrinks: Drink[] = [];
  //Categories for types of glasses and spirits used in the dropdown
  typesOfAcohol = ['Brandy', 'Gin', 'Rum', 'Tequila', 'Vodka', 'Whiskey'];
  typesOfGlass = ['Cocktail', 'Highball', 'Rocks', 'Shot'];
  //Array for holding the latest visited drinks.
  lastFiveDrinks: Drink[] = [];
  //Array for holding the selected filters.
  filters: string[] = []; //Since ingredients and glasstype wont be the same, we can keep them in the same array.
  //If we sort by name or author
  sortBy = 'name';
  //Holds a boolean to choose between fancy and regular view.
  gridView = true;
  //Controls if it is the first time we gather drinks
  firstFetch = true;
  //Holds value from search
  searchField = "";

  constructor(
    private drinkService: DrinkService,
    private router: Router) { }

  /**
   * Calls drinkservice to retrieve drinks from database.
   */
  getDrinks(): void {
    let self = this;
    
    //Gets drinks from drinkservice. the 0 indicates to not skip any records.
    this.drinkService.getDrinks(0)
      .subscribe(
      (drinks: Drink[]) => {
        if(self.firstFetch){
          this.totalDrinks = drinks;
          self.firstFetch = false;
        }
        this.drinks = drinks;
        this.sortArray(this.drinks);
        self.filterDrinks(false);
      }
      );
  }

  /**
   * Sorts array by the name of the drink.
   * @param array
   */
  sortArray(array) {
    if (this.sortBy === 'name') {
      array.sort(function (a, b) {
        let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0; //default return value (no sorting)
      })
    } else {
      array.sort(function (a, b) {
        let nameA = a.authorName.toLowerCase(), nameB = b.authorName.toLowerCase()
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
  navigateToDrink(id) {
    this.router.navigate(['/drink', id]);
  }

  /**
   * After pressing on drink we add the drink to the last
   * five visited drinks and pop the array if there is more 
   * than five drinks in it. We also save the last five 
   * drinks array to localstorage. Then we navigate to the 
   * drink view.
   * @param drink
   */
  onSelectDrink(drink){
    try{
      this.lastFiveDrinks.push(drink);
      localStorage.setItem('lastFiveDrinks', JSON.stringify(this.lastFiveDrinks));
    }catch(error){
      console.log(error);
    }
    this.navigateToDrink(drink.id);
  }

  /**
   * Gets called when the user scrolls almost to the bottom of the page
   * When called it increments total records to skip so that it always fetches 12 new records at the time.
   * @param ev
   */
  onScrollDown(ev) {
    this.skip = this.skip += 12;
    this.drinkService.getDrinks(this.skip)
      .subscribe(
      (drinks: Drink[]) => {
        this.totalDrinks.push.apply(this.totalDrinks, drinks);
        this.filterDrinks(false);
      }
      );
  }

  /**
   * Realtime search for drinks.
   * If the user has typed more than 3 letters it will check the db to see if it can find any records.
   * if total letters is less than 3 it will just get the 12 first records from db.
   * @param e
   */
  searchDrink(e) {
    console.log("Searching");
    let self = this;
    if (e.target.value.length > 2) {
      this.searchField = e.target.value;
      this.drinkService.searchDrink(e.target.value)
        .subscribe(
        (drinks: Drink[]) => {
          this.drinks = drinks;
          this.sortArray(this.drinks);
          this.filterDrinks(true);
        }
        )
    } else {
      this.skip = 0;
      this.drinks = this.totalDrinks;
      this.searchField = "";
    }
  }

  reSearchDrink(string) {
      this.drinkService.searchDrink(string)
        .subscribe(
        (drinks: Drink[]) => {
          this.drinks = drinks;
          this.sortArray(this.drinks);
        });
  }

  /**
   * This method filters the drink array.
   * If there are no filters, we return. This is so we wont get an empty list when checking for filters.
   * **/
  filterDrinks(fromSearch) {
    let self = this;
    if(fromSearch || this.searchField !== ""){
      if (this.filters.length < 1){
        self.reSearchDrink(self.searchField);
        return;
      }
      this.filteredDrinks = self.drinks.filter(function (drink, index, array) {
        if (self.filters.includes(drink.glass)) {
          return true;
        }
        for (let ingredient of drink.ingredients) {
          if (self.filters.includes(ingredient.name.toLowerCase())) {
            return true;
          }
        }
      });
    }else{
      if (this.filters.length < 1){
        this.drinks = this.totalDrinks;
        this.sortArray(this.drinks);
        return;
      }
      this.filteredDrinks = self.totalDrinks.filter(function (drink, index, array) {
        if (self.filters.includes(drink.glass)) {
          return true;
        }
        for (let ingredient of drink.ingredients) {
          if (self.filters.includes(ingredient.name.toLowerCase())) {
            return true;
          }
        }
      });
    }
    self.drinks = this.filteredDrinks;
    self.sortArray(this.drinks);
  }

  /**
   * This method simply adds a filter to the filter-array that holds current active filters.
   * @param filter is the filter to be added to the array.
   **/
  onClickFilter(filter) {
    //Setting filter to lowercase for consistency with db
    filter = filter.toLowerCase();
    let self = this;
    //If the filter list already includes the filter, remove it.
    if (self.filters.includes(filter)) {
      self.filters.forEach((item, index) => {
        if (item === filter) self.filters.splice(index, 1);
      });
    } else {
      self.filters.push(filter);
    }
    self.filterDrinks(false);
  }

  /**
   * Method for changing the sorting of drinks
   * @param e name or author
   */
  changeSort(e) {
    this.sortBy = e.value;
    this.sortArray(this.drinks);
  }

  /**
   * Changes between the regular and fancy view.
   * @param e 
   */
  changeView(e) {
    console.log(e.value);
    if (e.value === "grid"){
      this.gridView = true;
    } else {
      this.gridView = false;
    }
    console.log(this.gridView);
  }

  /**
   * This method gets called when the component is initialized.
   * Starts with using the getDrinks() method.
   * We check to see if there is any last five drinks in localstorage
   * and add these to the array if they exist. If not, we initialize
   * a new array.
   */
  ngOnInit() {
    this.getDrinks();
    let tempLastFiveDrinks = JSON.parse(localStorage.getItem('lastFiveDrinks'));

    if(tempLastFiveDrinks){
      if(tempLastFiveDrinks.length > 5){
        let numElements = Math.abs(5 - tempLastFiveDrinks.length);
        tempLastFiveDrinks.splice(0, numElements);
      }
      this.lastFiveDrinks = tempLastFiveDrinks;
    }else{
      this.lastFiveDrinks = new Array<Drink>();
    }
  }
}
