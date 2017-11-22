# IT2810 - Prosjekt 4 - Gruppe 34

# Description

In this project we have created a portal for viewing different types of cocktails and drinks. Any user can access the portal and look at the drink catalog. We have also implemented search and filtering possibilites for the user.

If the user wants to take a closer look at the drink and perhaps learn how to make it, he or she can simply click the drink item in the catalog and see a more detailed page.

We have also implemented user management. This means that should the user want, it is possible to create an account. This gives the user the ability to add new drinks to the catalog, as well as favorite the best drinks.

There is a database for storing all drinks and user information.

# Technology

## Frontend
The system uses [Angular 5](https://www.angular.io) 5 for frontend.

## Backend
This project uses a NodeJS server and a MongoDB database.

## Modules
* Mongoose - Methods for communicating with MongoDB
* Express
* Material UI - prestyled components used on the frontend.
* Bootstrap - Needed for showing drinks as a slideshow.

# Folder structure

[/client](./client) - The angular part of the application served to the client
[/server](./server) - The server side of the application hosting the REST API and acting as a web server
[/README-Images](./README-Images) - Folder used only for hosting images used in the README.md-file.

## Components

Here you can read a bit about the different components our project uses:

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


- Login page
- User page (edit user)
- Search component
- List component (for listing the drinks)
- Drink component
- Add drink component
- Register new user component

# Tasks and solutions

Task 1: 
The webapplication will run on the groups viritual machine and use node.js at the serverside, and developed in Angular v2 or v4. 

Task 2:
The webapplication will include a database, of the groups choice, that runs on the groups viritual machine. The database are to be well designed according to good practice. 

Task 3: 
You are to demonstrate both writing and reading operations to the database, including a formof search. Implement either your own data, or data found on the web.

Task 4:


# First draft
Here you can read about the first draft regarding what the system would look like, both on the frontend and the backend. 

## First description
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


