import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Drink} from '../drink';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {DrinkService} from '../drink.service';
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../auth.service";
import {JwtHelperService} from "../jwthelper.service";

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css']
})
export class DrinkComponent implements OnInit, OnDestroy {

  drink: Drink;
  sub: Subscription;
  isFavourite: boolean = false;
  isLoggedIn: boolean;

  constructor(private route: ActivatedRoute,
              private drinkService: DrinkService,
              private location: Location,
              private auth: AuthService,
              private jwt: JwtHelperService) {
  }

  ngOnInit() {
    let self = this;
    this.sub = this.route.params.subscribe((params) => {
      let id = params['id'];
      console.log(id);
      self.getDrink(id);
    });

    try {
      self.auth.verifyToken().subscribe((res) => {
        if (res) {
          self.isLoggedIn = true;
        } else {
          console.log("Could probably not find any token")
        }
      });
    } catch (e) {
    }
  }

  getDrink(id) {
    console.log(id);
    this.drinkService.getDrink(id)
      .subscribe(drink => {
        this.drink = drink
      });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
