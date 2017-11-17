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

  drinks: Drink[] = [];
  typesOfAcohol = ['Brandy', 'Gin', 'Rum', 'Tequila', 'Vodka', 'Whiskey'];
  typesOfGlass = ['Cocktail', 'Highball', 'Rocks', 'Shot'];

  constructor(
    private drinkService: DrinkService,
    private router: Router){}

  getDrinks(): void {
    this.drinkService.getDrinks()
      .subscribe(
        (drinks: Drink[]) => {
          this.drinks = drinks;
        }
      );
  }

  navigateToDrink(id){
      this.router.navigate(['/drink',id])
  }

  onSelect(drink): void{
    console.log("Clicked on: " + drink.name);
    //Routing to drink
  }

  ngOnInit(){
    this.getDrinks();
  }
}
