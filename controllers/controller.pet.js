const TAG = "controller.pet.js"

const csvParse = require('../modules/csv/csv.parse');
const basicUtils = require('../utils/basic.utils')

module.exports = {
    add: async (req, res) => {
        //res.send("add")
        //basicUtils.logger(TAG, `${req}`)
        console.log(req.originalUrl);
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