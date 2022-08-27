require('dotenv').config()

const TAG = "server.js"

const csvParser = require('csv-parser');
const express = require('express');
const csvParse = require('./modules/csv/csv.parse');
const routesPet = require('./router/routes.pet')
const app = express()
const port = process.env.PORT || 5052;
app.use(express.json())
app.use('/api/pet', routesPet)


//const mongoDbConnection = require('./modules/mongodb/mongodb.connect')

app.listen(port, () => {
    console.log(TAG, `PetBarnacle running on port ${port}`)
    csvParse.parseCsv()
});


