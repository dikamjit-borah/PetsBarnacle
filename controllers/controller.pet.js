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
                if (petData.err) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ADD_PET_ERR, { error: petData.err })
                if (petData.parsedCsvData && petData.parsedCsvData.length > 0) {
                    const result = await servicePet.insertManyIntoPetsCollection(petData.parsedCsvData)
                    if (result) {
                        if (result.err) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ADD_PET_ERR, { error: result.err })
                        if (result.upserted) return basicUtils.generateResponse(res, httpStatus.OK, `${constants.messages.ADD_PET_SUCCESS} with ${result.upserted} records`)
                        else return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.ADD_PET_UPDATED)
                    }
                } else return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.ADD_PET_EMPTY)


            } catch (error) {
                return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.ADD_PET_NONE, { error: "" + error })
            }

        }
        else basicUtils.generateResponse(res, httpStatus.BAD_GATEWAY, constants.messages.DB_DOWN)
    },

    viewAll: async (req, res) => {
        basicUtils.logger(TAG, `Hitting ${req.originalUrl}`)
        if (global.mongoDbConnection) {
            try {
                const result = await servicePet.fetchAllFromPetCollection()
                if (result) {
                    if (result.err) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.VIEWALL_PET_ERR, { error: result.err })
                    if (result.data && result.data.length > 0) return basicUtils.generateResponse(res, httpStatus.OK, `${constants.messages.VIEWALL_PET_SUCCESS} with ${result.data.length} records`, { pets: result.data })
                    else return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.VIEWALL_PET_EMPTY)
                }
            } catch (error) {
                return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.VIEWALL_PET_ERR, { error: "" + error })
            }
        }
        else basicUtils.generateResponse(res, httpStatus.BAD_GATEWAY, constants.messages.DB_DOWN)
    },

    viewPet: async (req, res) => {
        basicUtils.logger(TAG, `Hitting ${req.originalUrl}`)
        const petId = req.params.id && req.params.id != "0" && !isNaN(req.params.id) ? req.params.id : ""
        if (!petId) return basicUtils.generateResponse(res, httpStatus.BAD_REQUEST, constants.messages.PET_INVALID_ID)
        if (global.mongoDbConnection && petId) {
            try {
                const result = await servicePet.fetchOneFromPetCollection(petId)
                if (result) {
                    if (result.err) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.VIEW_PET_ERR, { error: result.err })
                    if (result.data && result.data.length > 0) return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.VIEW_PET_SUCCESS, { petDetails: result.data })
                    else return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.PET_EMPTY_ID)
                }
            } catch (error) {
                return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.VIEW_PET_ERR, { error: "" + error })
            }
        }
        else basicUtils.generateResponse(res, httpStatus.BAD_GATEWAY, constants.messages.DB_DOWN)
    },

    updatePet: async (req, res) => {
        basicUtils.logger(TAG, `Hitting ${req.originalUrl}`)

        const petId = req.params.id && req.params.id != "0" && !isNaN(req.params.id) ? req.params.id : ""
        if (!petId) return basicUtils.generateResponse(res, httpStatus.BAD_REQUEST, constants.messages.PET_INVALID_ID)

        let petData = {

        }

        try {
            const body = req.body ? req.body : ""
            body && body.name ? petData['name'] = body.name : null
            body && body.type ? petData['type'] = body.type : null
            body && body.breed ? petData['breed'] = body.breed : null
            body && body.age ? petData['age'] = body.age : null
        } catch (error) {
            console.log(error);
            return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.PARSE_ERR)
        }

        if (!petData || !Object.keys(petData).length) return basicUtils.generateResponse(res, httpStatus.BAD_REQUEST, constants.messages.UPDATE_PET_NO_BODY)

        if (global.mongoDbConnection && petId && petData) {
            try {
                const result = await servicePet.updateOneInPetCollection(petId, petData)
                if (result) {
                    if (result.err) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.UPDATE_PET_ERR, { error: result.err })
                    if (!result.isMatched) return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.PET_EMPTY_ID)
                    return (result.isUpdated) ? basicUtils.generateResponse(res, httpStatus.OK, `${constants.messages.UPDATE_PET_SUCCESS} for pet id ${petId}`) : basicUtils.generateResponse(res, httpStatus.OK, constants.messages.UPDATE_PET_NONE)
                }
            } catch (error) {
                return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.UPDATE_PET_ERR, { error: "" + error })
            }
        }
        else basicUtils.generateResponse(res, httpStatus.BAD_GATEWAY, constants.messages.DB_DOWN)
    },

    deletePet: async (req, res) => {
        basicUtils.logger(TAG, `Hitting ${req.originalUrl}`)
        const petId = req.params.id && req.params.id != "0" && !isNaN(req.params.id) ? req.params.id : ""
        if (!petId) return basicUtils.generateResponse(res, httpStatus.BAD_REQUEST, constants.messages.PET_INVALID_ID)
        if (global.mongoDbConnection && petId) {
            try {
                const result = await servicePet.deleteOneInPetCollection(petId)
                if (result) {
                    if (result.err) return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, `${constants.messages.DEL_PET_ERR} with id ${petId}`, { error: result.err })
                    if (result.isDeleted) return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.DEL_PET_SUCCESS)
                    else return basicUtils.generateResponse(res, httpStatus.OK, constants.messages.PET_EMPTY_ID)
                }
            } catch (error) {
                return basicUtils.generateResponse(res, httpStatus.INTERNAL_SERVER_ERROR, constants.messages.DEL_PET_ERR, { error: "" + error })
            }
        }
        else basicUtils.generateResponse(res, httpStatus.BAD_GATEWAY, constants.messages.DB_DOWN)
    }

}