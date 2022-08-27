require('dotenv').config

const TAG = "mongodb.connect.js"

const mongoose = require('mongoose');
const basicUtils = require('../../utils/basic.utils');

module.exports = getMongoDbInstance = async function () {
    let _mongoDbInstance
    if (!_mongoDbInstance) {;
         mongoose.connect(process.env.MONGODB_URL)
        _mongoDbInstance =  mongoose.connection;
        _mongoDbInstance.on('error', console.error.bind(console, 'connection error:'));

        _mongoDbInstance.once('open', function () {
            //basicUtils.logger(TAG, `Connection to MongoDb created successfully`)
            basicUtils.logger(TAG, `Connection to MongoDb established successfully`)
        });
        return _mongoDbInstance
    }
    return _mongoDbInstance
}()