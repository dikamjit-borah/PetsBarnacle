require('dotenv').config()
const TAG = "server.js"

const express = require('express');

const routesPet = require('./router/routes.pet')
const app = express()
const port = process.env.PORT || 5052;
app.use(express.json())
app.use('/api/pet', routesPet)

const mongoDbConnection = require('./modules/mongodb/mongodb.connect')()
global.mongoDbConnection = mongoDbConnection

app.listen(port, () => {
    console.log(TAG, `PetBarnacle running on port ${port}`)
});


