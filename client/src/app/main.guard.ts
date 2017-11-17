import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/catch';

@Injectable()
export class MainGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate() {
    let self = this;
    return Observable.create(observer => {
      self.auth.verifyToken().catch(self.handleRejection).subscribe(res => {
        observer.next(true);
        observer.complete();
      },error=>{
        self.router.navigate(['/unauthorized']);
        observer.next(false);
        observer.complete();
      })
    });
  }
  
  handleRejection() {
    let self = this;
    self.router.navigate(['/login']);
    return Observable.throw(new Error("Not authorized to navigate"));
  }
}
