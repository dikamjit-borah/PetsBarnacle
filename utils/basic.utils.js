


module.exports = {
    logDatetime: function(){
        return (new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    logger: function(TAG, message){
        console.log(`[${this.logDatetime()}][${TAG}] ${message}`);
    },
}
