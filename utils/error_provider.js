let errorDetails;
module.exports = errorDetails = (code, errorId, message, error, details = []) => {
    console.log('Error Code :: ' + code + ' Error Message :: ' + message);
    if (error.errorId != undefined) {
        return error;
    }

    return ({
        "code": code,
        "errorId": errorId,
        "message": message,
        "details": details
    });
}