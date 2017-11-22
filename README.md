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

# Further work

__Standardization of ingredients__
As the application is now the user can add whatever ingredient he or she should choose. The problem is that we can not filter all ingredients. We could implement a standardization of more spirits. This would also make it possible to group drinks based on their base spirit upposed to only filterin them.

__Fix filter bugs__
Some bugs still remain with the filter function. We are experiencing loss of infinite scroll and some weird filtering happening some times when we add or remove filters.

__Delete drinks__
Add functionality so the user can delete the drinks related to the account.

__Edit drinks__
Give the user ability to edit drinks related to the accound.

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


