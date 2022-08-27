const csv = require('csv-parser')
const fs = require('fs');
const { resolve } = require('path');
const path = require('path');
const csvPath = path.join(__dirname, '../data/pet_data.csv');
const results = [];

module.exports = {
    parseCsv: async () => {
        let data = await new Promise((resolve, reject) => {
            let results = []
            fs.createReadStream(csvPath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', () => {
                    resolve(results)
                });
        })
        return data
    }
}

