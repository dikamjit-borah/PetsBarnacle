const TAG = "service.js"

const modelPet = require('../models/model.pet');

module.exports = {
    insertManyIntoPetsCollection: async (rows) => {
        let upserted = 0
        let err
        try {
            const result = await modelPet.bulkWrite(
                rows.map((row) =>
                ({
                    updateOne: {
                        filter: { petId: row.petId },
                        update: { $set: row },
                        upsert: true
                    }
                }))
            )

            upserted = result.upsertedCount ? result.upsertedCount : 0
        } catch (error) {
            console.log(error);
            err = "" + error
        }
        return {
            upserted,
            err
        }
    },

    fetchAllFromPetCollection: async () => {
        let data
        let err
        try {
            data = await modelPet.find({})
        } catch (error) {
            console.log(error);
            err = "" + error
        }
        return {
            data,
            err
        }
    },

    fetchOneFromPetCollection: async (petId) => {
        let data
        let err
        try {
            data = await modelPet.find({ petId })
        } catch (error) {
            console.log(error);
            err = "" + error
        }
        return {
            data,
            err
        }
    },

    updateOneInPetCollection: async (petId) => {
        let isMatched = false
        let isUpdated = false
        let err
        try {
            result = await modelPet.updateOne({ petId }, {breed: "faaaaaaaaaadadad"})
            isMatched = result && result.matchedCount ? true : false
            isUpdated = result && result.modifiedCount ? true : false
        } catch (error) {
            console.log(error);
            err = "" + error
        }
        return {
            isMatched,
            isUpdated,
            err
        }
    }
}