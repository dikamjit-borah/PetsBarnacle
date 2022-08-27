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
            console.log(upserted);
            console.log("fsfj");
        } catch (error) {
            console.log(error);
            err = "" + error
        }
        return {
            upserted,
            err
        }
    }
}