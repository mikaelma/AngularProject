import { Component, OnInit } from '@angular/core';
import { DrinkListComponent } from '../drink-list/drink-list.component';
import {AuthService} from '../auth.service';
import {DrinkService} from '../drink.service';
import {Drink} from '../drink';
import {Ingredient} from '../drink';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})

export class MainPageComponent implements OnInit {

  constructor(private auth:AuthService,private drinks:DrinkService) { }

  ngOnInit() {

  }
}
