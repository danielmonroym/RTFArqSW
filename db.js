// mongodb driver
const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl = "mongodb+srv://root:root@cluster0-r3v7w.mongodb.net/test?retryWrites=true&w=majority";

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {
    MongoClient.connect(dbConnectionUrl,{useUnifiedTopology: true}, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            const useUnifiedTopology=true;
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection);
        }
    });
}


module.exports = {
    initialize
};

