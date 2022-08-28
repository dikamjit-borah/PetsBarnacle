require('dotenv').config

const TAG = "mongodb.connect.js"

const mongoose = require('mongoose');
const basicUtils = require('../../utils/basic.utils');
const constants = require('../../utils/constants');

module.exports = getMongoDbInstance = async function () {
    let _mongoDbInstance
    try {
        if (!_mongoDbInstance) {
            mongoose.connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            _mongoDbInstance = mongoose.connection;
            _mongoDbInstance.on('error', (error) => {
                console.log(error);
                basicUtils.logger(TAG, constants.messages.MONGO_CONN_ERR)
            })
            _mongoDbInstance.once('open', () =>
                basicUtils.logger(TAG, constants.messages.MONGO_CONN_SUCCESS)
            );
            return _mongoDbInstance
        }
    } catch (error) {
        console.log(error);
        basicUtils.logger(TAG, constants.messages.MONGO_CONN_ERR)
    }
    basicUtils.logger(TAG, constants.messages.MONGO_CONN_FAIL)
    return _mongoDbInstance
}