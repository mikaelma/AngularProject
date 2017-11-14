import { Component, OnInit, Input} from '@angular/core';
import { Drink } from '../drink';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DrinkService } from '../drink.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css']
})
export class DrinkComponent implements OnInit {

  @Input() drink: Drink;

  constructor(
    private route: ActivatedRoute,
    private drinkService: DrinkService,
    private location: Location) {}

  ngOnInit() {
    this.getHero();
  }

  getHero(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.drinkService.getDrink(id)
      .subscribe(drink => this.drink = drink);
  }

  goBack(): void {
    this.location.back();
  }
}
