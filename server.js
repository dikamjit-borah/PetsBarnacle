require('dotenv').config()

const TAG = "server.js"

const express = require('express')
const app = express()
const port = process.env.PORT || 5052;
app.use(express.json())

app.listen(port, () => {
  console.log(TAG, `PetBarnacle running on port ${port}`)
});


