import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Drink } from '../drink';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DrinkService } from '../drink.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css']
})
export class DrinkComponent implements OnInit,OnDestroy {

  drink:Drink
  sub:Subscription
  constructor(
    private route: ActivatedRoute,
    private drinkService: DrinkService,
    private location: Location) {}

  ngOnInit() {
    let self = this;
    this.sub = this.route.params.subscribe((params)=>{
       let id = params['id'];
       console.log(id);
       self.getDrink(id);
    });
  }

  getDrink(id){
    console.log(id);
    this.drinkService.getDrink(id)
      .subscribe(drink => {
        this.drink = drink
      });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
