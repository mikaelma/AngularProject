import { Component, OnInit } from '@angular/core';
import { DrinkService } from '../drink.service';
import { Drink } from '../drink';

/**
 * @title Table with sorting
 */

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css'],
})

export class DrinkListComponent implements OnInit {
  
  drinks: Drink[] = [];

  constructor(private drinkService: DrinkService){}

  getDrinks(): void {
    this.drinks = this.drinkService.getDrinks();
  }

  onSelect(drink): void{
    console.log("Clicked on: " + drink.name);
  }

  ngOnInit(){
    this.getDrinks();
  }
}