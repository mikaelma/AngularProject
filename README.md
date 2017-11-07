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

**Frontend**
The system uses Angular 5 for frontend.

**Backend**
For backend the server will run NodeJS with express and the database will be MongoDB.

**Modules**
* Mongoose - Methods for communicating with MongoDB
* Express

# Folder structure

/client - The angular part of the application served to the client
/server - The server side of the application hosting the REST API and acting as a web server

## Components

This is a basic sketch of the components we will have to use. The list is not final but this is where we will start our development.

- Login page
- User page (edit user)
- Search component
- List component (for listing the drinks)
- Drink component
- Add drink component
- Register new user component

# Mockup frontend

# Mockup backend
![Basic backend functionality](/README-Images/backendMockup.png)

## ER Diagram
![Mongoose schema of the database](/README-Images/databaseER.png)
This is the mongoose schemas for the two collections we will be using. 
The user schema needs a firstname, surname, password(encrypted), email, an array of created drink recipes 
and an array of drinks the user has favourised. We will be using an additional package for mongoose which makes the email for each user unique so that you can't create two users with same email. 
The arrays of drinks will be reffered to the Drink scgema.

The Drink schema needs the name of the drink, an array of ingredients and an author which is the user that created the drink.
Description, image, glass and recipe is not required. 


