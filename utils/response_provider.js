let responseDetails;
module.exports = responseDetails = (status = 200, response = {}, error = {}) => {
    return ({
        "status": status,
        "data": response,
        "error": error
    });
}