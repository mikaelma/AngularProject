# IT2810 - Prosjekt 4 - Gruppe 34

# Description

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

# Technology

## Frontend
The system uses Angular 5 for frontend.

## Backend
For backend the server will run NodeJS with express and the database will be MongoDB.

## Modules
* Mongoose - Methods for communicating with MongoDB
* Express
* Material UI - prestyled components used on the frontend.

# Folder structure

/client - The angular part of the application served to the client

/server - The server side of the application hosting the REST API and acting as a web server

* [change-password-dialog](./client/src/app/change-password-dialog) - Dialog box for changing password from [my-page](./client/src/app/my-page) component.
* [drink](./client/src/app/drink) - This is the page for showing the drink component. 
* [drink-list](./client/src/app/drink-list) - This is the front page of the application. It lists all the drinks in the database.
* [header](./client/src/app/header) - The header component. Standard Material UI component. Used for navigation, login, register and my-page.
* [login-dialog-box](./client/src/app/login-dialog-box) - Popup login box for entering user information.
* [main-page](./client/src/app/main-page) - Application root html. 
* [drink](./client/src/app/drink)
* [drink](./client/src/app/drink)
* [drink](./client/src/app/drink)
* [drink](./client/src/app/drink)
* [drink](./client/src/app/drink)
* [drink](./client/src/app/drink)

This is a basic sketch of the components we will have to use. The list is not final but this is where we will start our development.

- Login page
- User page (edit user)
- Search component
- List component (for listing the drinks)
- Drink component
- Add drink component
- Register new user component

# Tasks and solutions

**Task 1:**. 
The webapplication will run on the groups viritual machine and use node.js at the serverside, and developed in Angular v2 or v4. 

**Task 2:**. 
The webapplication will include a database, of the groups choice, that runs on the groups viritual machine. The database are to be well designed according to good practice. 

**Task 3:**. 
You are to demonstrate both writing and reading operations to the database, including a form of search. Implement either your own data, or data found on the web.

Solution:  
There are several places where we write and read from the database. All these are found in the file ./server/index.js .
One example of this is the login-function. The information is gathered from the loginDialogBox-component and forwards the       information to the header-component. The service-component auth.service.ts then handles this information, which again is used by index.js. 

The information gathered from the login dialog box are handeled the following way in header.component.ts:
```
    dialogRefLogin.afterClosed().subscribe(result => {
          self.auth.loginUser(result.email, result.password).subscribe((user) => {
            self.isLoggedIn = true;
            self.loginDisplayName = user.firstName + " " + user.lastName;
          }, (err) => {
            this.snackBar.open('Login failed:', 'Wrong username or password', {
              duration: 3500
            });
            console.log('err: ' + err);
          })
        });
```


**Task 4:**   
The user interface must contain a list-based view with few details for every unit. The goal is to show the user the content of the database or the result of a search. The user are to have the option to see more details for every unit, either in a separate window or by a expand/collapse feature.

**Task 5:**   
The list needs to have the ability to get sorted by two attributes. 

**Task 6:**   
The list needs to have the ability to get filtered by two attributes. 

**Task 7:**.  
The list needs to have the ability to load data dynamically.

**Task 8:**   
The webapplication must contain a "My page" where a user can log on and where some of the search activity are stored. 

**Task 9:**   
You need to implement session-handling in the webapplication.

**Task 10:**   
The webapplication must have a "fancy", alternate, list view to the original one.

**Task 11:**   
The code needs to be tested and the functionality have to be well tried and not faulty.

**Task 12:**   
The project needs to be well documented. 

# First draft
Here you can read about the first draft regarding what the system would look like, both on the frontend and the backend. 

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


