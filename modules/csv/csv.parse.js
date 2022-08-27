const csv = require('csv-parser')
const fs = require('fs')
const path = require('path');
const csvPath = path.join(__dirname, '../data/pet_data.csv');
const results = [];

module.exports = {
    parseCsv: () => {
        console.log(csvPath);
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(results);
            });
    }
}

