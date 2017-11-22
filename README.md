# IT2810 - Prosjekt 4 - Gruppe 34

![Logo](./client/src/logoTransBlack.png)

# Description

In this project we have created a portal for viewing different types of cocktails and drinks. Any user can access the portal and look at the drink catalog. We have also implemented search and filtering possibilites for the user.

If the user wants to take a closer look at the drink and perhaps learn how to make it, he or she can simply click the drink item in the catalog and see a more detailed page.

We have also implemented user management. This means that should the user want, it is possible to create an account. This gives the user the ability to add new drinks to the catalog, as well as favorite the best drinks.

There is a database for storing all drinks and user information.

## Conclusion

We really feel we have learned a lot from this project. It has been both difficult and fun to build a whole application from scratch, and we have tried to divide the workload evenly between us and let all of us get a challenge from this process. 

If you are interested in checking out our original idea for this project you can do so further down in __Original Plan__. 

# Running the project

## Dependencies
__Angular CLI__
If you don't already have angular@cli run: npm install -g angular@cli

__MongoDB__
We use mongodb for database. The easiest way to install MongoDB is to check out the [documentation](https://docs.mongodb.com/manual/installation/).

__NodeJS__
The server is run by NodeJS. Easiest way to get it is by downloading it from their [webpage](https://nodejs.org/en/download/).

## Instructions
* Clone the project
* Start mongodb: Run _mongod_ in terminal.
* Change to the _putin_ database: in terminal run _mongo_ command. In the mongo program run _use putin_.
* Start the server: in the folder ./server run _node index.js_ or _nodemon index.js_ (if you use nodemon).
* Build the client: navigate to ./client and run: _ng build --watch_.
* Access the project: in your preferred web browser, go to _localhost:8084_.

# Technology

## Frontend
The system uses Angular 5 for frontend.

## Backend
For backend the server will run NodeJS with express and the database will be MongoDB.

## Modules
* Mongoose - Methods for communicating with MongoDB
* Express
* Material UI - prestyled components used on the frontend.

## Tools
* Angular@CLI - Command Line Interface for generating boiler plate code.
* Nodemon - Watches for server side file changes and reboots server.

# Folder structure

[/client](./client) - The angular part of the application served to the client
[/server](./server) - The server side of the application hosting the REST API and acting as a web server
[/README-Images](./README-Images) - Folder used only for hosting images for the README.md

# Components

* [change-password-dialog](./client/src/app/change-password-dialog) - Dialog box for changing password from [my-page](./client/src/app/my-page) component.
* [drink](./client/src/app/drink) - This is the page for showing the drink component. 
* [drink-list](./client/src/app/drink-list) - This is the front page of the application. It lists all the drinks in the database.
* [header](./client/src/app/header) - The header component. Standard Material UI component. Used for navigation, login, register and my-page.
* [login-dialog-box](./client/src/app/login-dialog-box) - Popup login box for entering user information.
* [my-page](./client/src/app/my-page) - Page for user related stuff. Here you can change your password and see the drinks you've created. You can also take a look at your favorite drinks.
* [my-page-drink-list](./client/src/app/drink) - Component used for displaying the drinks you have created in [my-page](./client/src/app/my-page) component.
* [register-dialog-box](./client/src/app/register-dialog-box) - Dialogbox for registering new users. 
* [unauthorized](./client/src/app/unauthorized) - This page is shown when unauthorized users try to access pages they do not have access to.

# Tasks and solutions

**Task 1:**.  
The webapplication will run on the groups viritual machine and use node.js at the serverside, and developed in Angular v2 or v4. 

**Task 2:**   
The webapplication will include a database, of the groups choice, that runs on the groups viritual machine. The database are to be well designed according to good practice. 

**Task 3:**   
You are to demonstrate both writing and reading operations to the database, including a form of search. Implement either your own data, or data found on the web.

*Solution:*.  
There are several places where we write and read from the database. All these are found in the file ./server/index.js .
One example of this is the register-function. The information is gathered from the registerDialogBox-component and forwards the information to the header-component. The service-component auth.service.ts then handles this information, which again is used by index.js. 

The information gathered from the register dialog box are handeled the following way in header.component.ts:
```
...
   dialogRefRegister.afterClosed().subscribe(result => {
      let registerObject = {
        firstName: result.firstname,
        lastName: result.surname,
        email: result.registerEmail,
      }

      self.auth.registerUser(new User(result.firstname, result.surname, result.email), result.confirmPassword)
        .subscribe((res) => {
          let user = self.jwt.decodeToken(localStorage.getItem("token"));
          self.isLoggedIn = true;
          self.loginDisplayName = user.firstName + " " + user.lastName;
        }, (err) => {
          this.snackBar.open('Registration failed:', 'Email is already registered', {
            duration: 3500
          });
          console.log(err);
        });
    });
...
```
After the dialogbox is closed we subscribe the result to registerUser(), which expect an user-object and a password as parameters. registerUser() in auth.service.ts looks like this:
```
...
registerUser(user:User,password:string):Observable<Object>{
    let self = this;
    return Observable.create(observer=>{
    // Could create a class for this, but probably more boiler than profit, <any> works fine
      this.http.post<any>('/register',{user:user,password:password}).subscribe(res=>{ 
        if(res.token!=null){
          localStorage.setItem("token",res.token);
          observer.next();
          observer.complete();
        }else if(res.status){
          observer.error(res);
          observer.complete();        }
      })
    });
  }
...
```
This part of registerUser does the this.http.post-call, and is forwarded to '/register' in index.js:
```
...
    user.save((err, doc) => {
        if (err) {
            console.log(err);
            res.json({status: 500, message: "Error while trying to save document"});
        } else {
            console.log("Saved");
            let urlObject = {
                _id: doc._id,
                firstName: doc.firstName,
                lastName: doc.lastName,
                email: doc.email,
                favouriteDrinks: doc.favouriteDrinks,
                createdDrinks: doc.createdDrinks
            }
            let token = jwt.sign(urlObject, secretKey, {expiresIn: 18000});
            res.json({token: token});
        }
    })
...
```
This part of /register performs the .save-operation to mongoDb. 

**Task 4:**   
The user interface must contain a list-based view with few details for every unit. The goal is to show the user the content of the database or the result of a search. The user are to have the option to see more details for every unit, either in a separate window or by a expand/collapse feature.

*Solution:*   
The list is created in the drinkList-component. In this component we define an empty array, which in turn are filled with the drinks gathered by the getDrinks()-method. We then go through this array in the drinkList.component.html with an ngFor-loop. If a user clicks an element in the list, he is redirected by (click) = "onSelectDrink(drink)". An excerpt of the code is found below:

```
export class DrinkListComponent implements OnInit {
...
  drinks: Drink[] = [];
...
  constructor(
    private drinkService: DrinkService,
    private router: Router) { } 
...
    getDrinks(): void {
    let self = this;
    //Gets drinks from drinkservice. the 0 indicates to not skip any records.
    this.drinkService.getDrinks(0)
      .subscribe(
      (drinks: Drink[]) => {
        this.drinks = drinks;
        this.sortArray(this.drinks);
        self.filterDrinks();
      }
      );
  }
...
  onSelectDrink(drink){
    try{
      this.lastFiveDrinks.push(drink);
    }catch(error){
      console.log(error);
    }
    this.navigateToDrink(drink.id);    
  }
  
  navigateToDrink(id) {   
    this.router.navigate(['/drink', id]);    
  }
...
```
In the html-file, the list-view looks like this:   
```
...
    <div *ngFor="let drink of drinks">
      <div class="drinkListItem">
        <a (click)="onSelectDrink(drink)">
        <img class="drinkImage" src="{{drink.image}}" alt="{drink.name} image">
        <div class="drinkName">{{drink.name}}</div>
        <div class="subHeader">Author: {{drink.authorName}}</div>
        <div class="text">"{{drink.description}}"</div>
        </a>
      </div>
    </div>
 ...
```

**Task 5:**   
The list needs to have the ability to get sorted by two attributes. 

*Solution:*   
The list gets sorted in drinkList-component. In the html-file you find (change)="changeSort($event)" in the <div> "sortHolder". It is a simple method in drink-list.component.ts which changes the the parameters on which the list is sorted on. These are the name of the drink and the author of the drink. 

**Task 6:**   
The list needs to have the ability to get filtered by two attributes. 

*Solution:*   
The solution for this is similar to the one above; (change)="changeView($event)" is also an method in drink-list.component.ts.

**Task 7:**.  
The list needs to have the ability to load data dynamically.

*Solution:*   
This solution are also found in drink-list. In drink-list.component.ts the following method is found:
```
...
  onScrollDown(ev) {
    this.skip = this.skip += 12;
    this.drinkService.getDrinks(this.skip)
      .subscribe(
      (drinks: Drink[]) => {
        this.drinks.push.apply(this.drinks, drinks);
        this.sortArray(this.drinks);
      }
      );
  }
...
```
When the user scrolls down, and reaches the bottom, 12 new results are loaded until all results are shown. 

**Task 8:**   
The webapplication must contain a "My page" where a user can log on and where some of the search activity are stored. 

*Solution:*  
The login and register-functionality are bound to the header, as we found it more convenient. This functionality is covered in the description of task 3. Our "my page" contain three elements: User information/change password, which drink-recipies the user have added and a list over favourite drinks. We found it to be impractical to have search-information connected to "my page", and that is why we added myFavouriteDrinks. This was complemented with an overview over the last five drink which the user have looked at. This is found at the main page. 

**Task 9:**   
You need to implement session-handling in the webapplication.

**Task 10:**   
The webapplication must have a "fancy", alternate, list view to the original one.

*Solution:*
Our solution to the task to implement a "fancy" view were similar to how we solved filtering and sorting. In the drink-list-component, at the main page, the user can toggle between a grid-view and a slideshow. 

**Task 11:**   
The code needs to be tested and the functionality have to be well tried and not faulty.

**Task 12:**   
The project needs to be well documented. 

<<<<<<< HEAD
# Further work

__Standardization of ingredients__
As the application is now the user can add whatever ingredient he or she should choose. The problem is that we can not filter all ingredients. We could implement a standardization of more spirits. This would also make it possible to group drinks based on their base spirit upposed to only filterin them.

__Fix filter bugs__
Some bugs still remain with the filter function. We are experiencing loss of infinite scroll and some weird filtering happening some times when we add or remove filters.

__Delete drinks__
Add functionality so the user can delete the drinks related to the account.

__Edit drinks__
Give the user ability to edit drinks related to the accound.
=======
*Solution:*
We think this document in addition to well documented code will suffice. 
>>>>>>> dd30dded6530905be6045c62d11c4f55948976cf

# First draft
Here you can read about the first draft regarding what the system would look like, both on the frontend and the backend. 

## Original plan
In this project we will create a portal containing a catalog of different cocktails and drinks. All drinks will be an individual entity in our database. The database entry will contain the following:
* Image of the drink
* Glass to be served in
* Ingredients
* Recipe
* Description
* Author

(Some of the items may not be required or present in the final version of the application)

The user is presented with the portal screen where he or she can choose to either log into an existing user account, create a new one or just browse the existing drinks.

If the user is returning from a previous session where he or she logged in, the user can continue exporing the site, logged in.

The system will have a user database storing all user information and users will be able to log in to our system. 

## Mockup frontend
![Front page](/README-Images/Mock1.png)
![Drink page](/README-Images/Mock2.png)
![My page](/README-Images/Mock3.png)
![New drink page](/README-Images/Mock4.png)


## Mockup backend
![Basic backend functionality](/README-Images/backendMockup.png)

### ER Diagram
![Mongoose schema of the database](/README-Images/databaseER.png)

This is the mongoose schemas for the two collections we will be using; _User_ and _Drink_.

The user schema needs:
* firstname
* surname
* password(encrypted)
* email
* an array of created drink recipes 
* an array of drinks the user has favourised

We will be using an additional package for mongoose which makes the email for each user unique so that you can't create two users with same email. 
The arrays of drinks will be reffered to the _Drink schema_.

The Drink schema requires:
* name of the drink
* an array of ingredients
* author which is the user that created the drink.

The Drink schema contains, but does not require:
* Description
* image
* glass
* recipe


