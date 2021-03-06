import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Drink} from '../drink';
import {MatSnackBar} from '@angular/material';
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
  isRemove: boolean = false;
  isLoggedIn: boolean;

  constructor(private route: ActivatedRoute,
              private drinkService: DrinkService,
              private location: Location,
              private auth: AuthService,
              private jwt: JwtHelperService,
              private snackBar: MatSnackBar
  ) {}

  /** Verifying the user when we init the component. 
   * This is also so we can check if the user has
   * made this a favorite drink.**/
  ngOnInit() {
    let self = this;
    this.sub = this.route.params.subscribe((params) => {
      let id = params['id'];
      self.getDrink(id);
      let token = localStorage.getItem("token");
      if (token){
        let favouriteDrinks = self.jwt.decodeToken(token).favouriteDrinks;
        if (favouriteDrinks.includes(id)){
          this.isFavourite = true;
        } else {
          this.isFavourite = false;
        }
      }
    });

    try {
      self.auth.verifyToken().subscribe((res) => {
        if (res) {
          self.isLoggedIn = true;
        } else {
          console.log("Could probably not find any token");
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  /** Handles if a user adds a drink to favourites**/
  onClick(){
    this.isFavourite = !this.isFavourite;
    console.log(this.drink);
    if(!this.isFavourite){
      this.snackBar.open('Removed from favourites', '', {
        duration: 1000
      });
      this.drinkService.favouriteDrink(this.drink.id, false)
        .subscribe(res=>{
          console.log(res.favouriteDrinks);
        })
    }else if(this.isFavourite){
      this.snackBar.open('Added to favourites', '', {
        duration: 1000
      });
      this.drinkService.favouriteDrink(this.drink.id, true)
        .subscribe(res => {
          console.log(res.favouriteDrinks);
        });
    }

  }

  /** Getting the drink data from the server.**/  
  getDrink(id) {
    this.drinkService.getDrink(id)
      .subscribe(drink => {
        this.drink = drink
      });
  }

   /** Navigating back to where you came from.**/
  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
