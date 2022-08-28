const csv = require('csv-parser')
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');

const results = [];

module.exports = {
    parseCsv: async () => {
        let parsedCsvData
        let err
        try {
            const csvPath = path.join(__dirname, '../data/pet_data.csv')
            parsedCsvData = await new Promise((resolve, reject) => {
                let results = []

                fs.createReadStream(csvPath).on('error', (err) => {
                    reject(err)
                })
                    .pipe(csv())
                    .on('data', (data) => results.push(data))
                    .on('end', () => {
                        resolve(results)
                    })
            })
            if (!Array.isArray(parsedCsvData)) err = parsedCsvData
        } catch (error) {
            console.log(error);
            err = "" + error

        }
        return { parsedCsvData, err }
    }
}

