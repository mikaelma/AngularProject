import { Component, OnInit, ViewEncapsulation, OnChanges } from '@angular/core';

@Component({
  selector: 'app-create-drink',
  templateUrl: './create-drink.component.html',
  styleUrls: ['./create-drink.component.css'],
})
export class CreateDrinkComponent implements OnInit {
  imageUrl: string = "http://twinterritory.com/wp-content/uploads/2014/02/placeholder-300x400.jpg";

  constructor() {}

  ngOnInit() {
  }

  changeImage(e){
    if (e.target.value !== ""){
      return this.imageUrl = e.target.value;
    }
    this.imageUrl = "http://twinterritory.com/wp-content/uploads/2014/02/placeholder-300x400.jpg";
  }

  selectGlass(e){
    console.log(e.value)
  }
}
