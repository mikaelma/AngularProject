import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css'],
})
export class UnauthorizedComponent implements OnInit {

  imgUrl = "http://www.spatcave.com/icon27/IMG_0252_resize.JPG"
  constructor(private router:Router) { }

  ngOnInit() {

  }
  
  navigateHome(){
    this.router.navigate(['/']);
  }

}
