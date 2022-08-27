const TAG = "controller.pet.js"

const csvParse = require('../modules/csv/csv.parse');
const basicUtils = require('../utils/basic.utils')
const servicePet = require('../services/service.pet');

module.exports = {
    add: async (req, res) => {
        basicUtils.logger(TAG, `Hitting ${req.originUrl}`)
        let petData = await csvParse.parseCsv()
        const result = await servicePet.insertManyIntoPetsCollection(petData)
        if(result){
            if(result.err) return res.send(result.err)
            if(result.upserted) return res.send("inserted"+ result.upserted + "records")
            else return res.send("No entries added/updated")
        }
        res.send("something wrong")
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