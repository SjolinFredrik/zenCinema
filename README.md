#zenCinema by grupp-don-3

Begin with ```npm install```

Continue with following steps:
1. starts mongoDB
2. execute ```node importer```
3. execute ```node addPricesToDB```
4. execute ```node addSaloonsToDB```
6. execute ```node createShowings```
7. start application with ```npm start```

Making an admin in POSTMAN:
1. ```GET http://localhost:3000/json/users/```
2. Select the user which should be an admin and copy it's ```_ID```
3. ```PUT http://localhost:3000/json/users/:_ID``` with ```{ "admin": true }```
4. Do another ```PUT``` but this time reset the password to what it was before, ```{ "password": <oldPassword> }```
5. Updated user can now access the route ```/admin```
