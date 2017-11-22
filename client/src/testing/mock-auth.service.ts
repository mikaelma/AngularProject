import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {User} from '../app/user';

@Injectable()
export class MockAuth{
    constructor(){}
    
    loginUser(){
        return Observable.from([new User(
            "test",
            "testersen",
            "test@test.test"
        )])
    }

    registerUser(user:User){
        return Observable.create(observer =>{
            observer.next();
            observer.complete();
        });
    }

    verifyToken(){
        return Observable.create(observer=>{
            observer.next();
            observer.complete();
        })
    }
}