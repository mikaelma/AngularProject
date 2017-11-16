import { Component, OnInit, ViewEncapsulation, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {Drink} from "../../drink";

@Component({
  selector: 'app-create-drink',
  templateUrl: './create-drink.component.html',
  styleUrls: ['./create-drink.component.css'],
})
export class CreateDrinkComponent implements OnInit {
  imageUrl: string = "http://twinterritory.com/wp-content/uploads/2014/02/placeholder-300x400.jpg";
  drinkForm: FormGroup;
  public data = [{'ingredientName':'','measurementName':'','ingredientUnits':''}];

  constructor() {}

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
    this.data.push({'ingredientName':'','measurementName':'','ingredientUnits':''})
  }

  removeRow(){
    this.data.pop();
  }

  selectGlass(e){
    console.log(e.value)
  }

  onSubmit(){
    const drink = new Drink(

    );

    console.log(
      this.drinkForm.value.drinkName,
      this.drinkForm.value.description,
      this.drinkForm.value.imageUrl,
      this.drinkForm.value.drinkName,
      this.drinkForm.value.typeOfGlass,
      this.data,
      this.drinkForm.value.recipe,
    );
  }

  addIngredientName(e, i){
    this.data[i].ingredientName = e.target.value;
    console.log(this.data[i].ingredientName);
  }

  addMeasurementName(e, i){
    this.data[i].measurementName = e.value;
    console.log(this.data[i].measurementName);
  }

  addIngredientUnits(e, i){
    this.data[i].ingredientUnits = e.target.value;
    console.log(this.data[i].ingredientUnits);
  }
}
