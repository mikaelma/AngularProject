import { Component, OnInit, ViewEncapsulation, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {Drink, Ingredient} from "../drink";
import {DrinkService} from "../drink.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router/';

@Component({
  selector: 'app-create-drink',
  templateUrl: './create-drink.component.html',
  styleUrls: ['./create-drink.component.css'],
})
export class CreateDrinkComponent implements OnInit {
  imageUrl: string = "http://twinterritory.com/wp-content/uploads/2014/02/placeholder-300x400.jpg";
  drinkForm: FormGroup;
  public data = [{'ingredientUnits': 0, 'measurementName':'', 'ingredientName':''}];

  constructor(private drinkService: DrinkService, public snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.drinkForm = new FormGroup({
      drinkName: new FormControl(null, Validators.required),
      description: new FormControl(null),
      imageUrl: new FormControl(null, Validators.required),
      typeOfGlass: new FormControl(null, Validators.required),
      ingredientName: new FormControl(null, Validators.required),
      measurementName: new FormControl(null, Validators.required),
      ingredientUnits: new FormControl(null, Validators.required),
      recipe: new FormControl(null),
    });
  }

  changeImage(e){
    if (e.target.value !== ""){
      return this.imageUrl = e.target.value;
    }
    this.imageUrl = "http://twinterritory.com/wp-content/uploads/2014/02/placeholder-300x400.jpg";
  }

  addNewRow(){
    this.data.push({ingredientUnits: 0, measurementName:'cl', ingredientName:''})
  }

  removeRow(){
    this.data.pop();
  }

  selectGlass(e){
    console.log(e.value)
  }

  onSubmit(){
    let ingredients = new Array<Ingredient>();
    for(let item of this.data){
      ingredients.push(new Ingredient(item.ingredientUnits,item.measurementName,item.ingredientName));
    }

    const drink = new Drink(
      "",
      this.drinkForm.value.drinkName,
      ingredients,
      "",
      "",
      this.drinkForm.value.description,
      this.drinkForm.value.imageUrl,
      this.drinkForm.value.typeOfGlass,
      this.drinkForm.value.recipe
    );
    this.drinkService.addDrink(drink).subscribe(
      res => this.router.navigate(['/drink/', res.createdDrinks[res.createdDrinks.length-1]]),
      error => console.log(error)
      );
  }

  addIngredientName(e, i){
    this.data[i].ingredientName = e.target.value;
  }

  addMeasurementName(e, i){
    this.data[i].measurementName = e.value;
  }

  addIngredientUnits(e, i){
    this.data[i].ingredientUnits = e.target.value;
  }
}
