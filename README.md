# PetsBarnacle

## Tech Stack
Node.js <br>
Express.js <br>
Mongoose <br>
csv-parser <br>

## Deployment
Node.js application is deployed on **Heroku** <br>
**MongoDB Atlas** is used as a MongoDB database-as-a-service

## Apis
The application has 5 necessary endpoints

### A POST route “/api/pet” to add pets from an excel file

**POST** /api/pet/add <br>
**HOST** petsbarnacle.herokuapp.com

#### example call & sample response
```
https://petsbarnacle.herokuapp.com/api/pet/add
```
```
{
    "statusCode": 200,
    "message": "Successfully updated pet data in database with 11 records"
}
```

### A GET route “/api/pet” to get all the pets in the database

**GET** /api/pet/viewAll <br>
**HOST** petsbarnacle.herokuapp.com

#### example call & sample response
```
https://petsbarnacle.herokuapp.com/api/pet/viewAll
```
```
{
    "statusCode": 200,
    "message": "Successfully fetched pet data with 11 records",
    "data": {
        "pets": [
            {
                "_id": "630b6e37352a17a1772f3011",
                "petId": 1,
                "age": 10,
                "breed": "Breed1",
                "name": "Name1",
                "type": "Type1"
            },
            {
                "_id": "630b6e37352a17a1772f3012",
                "petId": 2,
                "age": 2,
                "breed": "Breed2",
                "name": "Name2",
                "type": "Type2"
            }
         ]
      }
}
```







### A GET route “/api/pet/<petId>” to get a specific pet (petId will be a dynamic value eg. /api/pet/abc123)
### A PATCH route “/api/pet/<petId>” to update the details of a specific pet
### A DELETE route “/api/pet/<petId>” to delete a specific pet

