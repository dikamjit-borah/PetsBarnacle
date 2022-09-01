module.exports = {
    messages: {
        SMTHNG_WRNG: "Something went wrong. Please try again",
        DB_DOWN: "Database is not connected. Please try after sometime",

        MONGO_CONN_READY: "Connection to cloud atlas ready",
        MONGO_CONN_SUCCESS: "Connection to cloud atlas established successfully",
        MONGO_CONN_FAIL: "Connection to cloud atlas could not be established",
        MONGO_CONN_ERR: "Something went wrong while connecting to cloud atlas",

        ADD_PET_ERR: "Error updating pet data in database",
        ADD_PET_SUCCESS: "Successfully updated pet data in database",
        ADD_PET_UPDATED: "Pet data already updated with latest records in database",
        ADD_PET_EMPTY: "No records found to update pet data in database",

        VIEWALL_PET_ERR: "Error fetching pet data",
        VIEWALL_PET_SUCCESS: "Successfully fetched pet data",
        VIEWALL_PET_EMPTY: "No records found",

        VIEW_PET_ERR: "Error fetching pet details",
        VIEW_PET_SUCCESS: "Successfully fetched pet details",

        DEL_PET_ERR: "Error deleting pet",
        DEL_PET_SUCCESS: "Successfully deleted pet",

        UPDATE_PET_ERR: "Error updating pet details",
        UPDATE_PET_SUCCESS: "Successfully updated details",
        UPDATE_PET_NONE: "Cannot update pet details with same data",
        UPDATE_PET_NO_BODY: "Please provide details to update the given pet id",

        UPLOAD_PET_SUCCESS: "Pet file successfully uploaded",
        UPLOAD_PET_FAIL: "Pet file could not be uploaded",

        PET_EMPTY_ID: "No record found for the given pet id",
        PET_INVALID_ID: "Please provide a valid pet id",

        PARSE_ERR: "Error parsing request body"

    }
}