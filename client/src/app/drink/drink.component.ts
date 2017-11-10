import { Component, OnInit } from '@angular/core';
import { Drink } from '../drink';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css']
})
export class DrinkComponent implements OnInit {

  drink: Drink = {
    name: 'Sloppy seconds',
    ingredients:[
      {measure: 2, name: 'Moonshine'},
      {measure: 2, name: 'Water'},
      {measure: 1, name: 'Tampon'},
    ],
    author: 'Harvey Dent',
    description: 'Perfect for a late night cap',
    image: 'https://dutchbros.com/public/images/drinks/Rebel_Unicorn_Blood_Iced.png',
    glass: 'Large',
    recipie: 'Mix everything in your finest cup. Has to have coffee stains or taste will be dissappointing. Serve warm with a slap to the face.'
  };

  constructor() { }

  ngOnInit() {
  }

}
