const Joi = require('joi');
const response_provider = require('../utils/response_provider');
const error_provider = require('../utils/error_provider');
const error_constants = require('../utils/error_constants').error_constants;

let sms_schema_validation = async function (req, res, next) {
    const sms_schema = Joi.object({
        message: Joi.string().min(5).max(256).required(),
        receiver: Joi.object({
            countryCode: Joi.string().min(1).max(3).required(),
            number: Joi.string().min(6).max(12).required()
        }).unknown()
    }).unknown();

    const { value, error } = sms_schema.validate(req.body, {
        abortEarly: false,
        language: {
            key: '{{key}} ',
            string: {
                regex: {
                    base: 'with value {{!value}} fails to match the required pattern: {{pattern}}'
                }
            }
        }
    });

    if(error && error.details) {
        res.send(response_provider(error_constants.validationError.code, {}, error_provider(error_constants.validationError.code, error_constants.validationError.errorId, error_constants.validationError.message, {}, error.details)));
    } else {
        next();
    }
}

module.exports.sms_schema_validation = sms_schema_validation;