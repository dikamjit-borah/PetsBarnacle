const TAG = "controller.pet.js"

const csvParse = require('../modules/csv/csv.parse');
const basicUtils = require('../utils/basic.utils')
const servicePet = require('../services/service.pet');
const constants = require('../utils/constants');
const httpStatus = require('http-status');

module.exports = {
    add: async (req, res) => {
        basicUtils.logger(TAG, `Hitting ${req.originalUrl}`)
        if (global.mongoDbConnection) {
            try {
                let petData = await csvParse.parseCsv()
                const result = await servicePet.insertManyIntoPetsCollection(petData)
                if (result) {
                    if (result.err) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ADD_PET_ERR, { error: result.err })
                    if (result.upserted) return basicUtils.generateResponse(res, httpStatus.OK, `${constants.messages.ADD_PET_SUCCESS} with ${result.upserted} records`)
                    else return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.ADD_PET_NONE)
                }

            } catch (error) {
                return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ADD_PET_NONE, { error: "" + error })
            }

        }
        else basicUtils.generateResponse(res, httpStatus.BAD_GATEWAY, constants.messages.DB_DOWN)
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