


module.exports = {
    logDatetime: function(){
        return (new Date())
    },
    logger: function(TAG, message){
        console.log(`[${this.logDatetime()}][${TAG}] ${message}`);
    },
}
