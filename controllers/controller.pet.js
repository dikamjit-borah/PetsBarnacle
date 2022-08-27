const csvParser = require('csv-parser');
const csvParse = require('../modules/csv/csv.parse');

module.exports = {
    add: async (req, res) => {
        //res.send("add")
        res.send(await csvParse.parseCsv())
    },

    viewAll: (req, res) => {
        res.send("viewAll")
    },

    viewPet: (req, res) => {
        res.send("getPet")
    },

    updatePet: (req, res) => {
        res.send("updatePet")
    },

    deletePet: (req, res) => {
        res.send("deletePet")
    }

}