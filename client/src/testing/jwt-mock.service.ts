import {Injectable} from '@angular/core';

@Injectable()
export class MockJwt{
    constructor(){}

    decodeToken(token:string){
        return {
            firstName:'test',
            lastName:'testersen',
            email:'test@test.test',
            favouriteDrinks:['0','1'],
            createdDrinks:['0','1']
        }
    }
}