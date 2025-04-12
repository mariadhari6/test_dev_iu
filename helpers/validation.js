const { hewan_schema } = require("../constants/index,js");

const validateAddRequest = (hewan) => {
    const result = {
        status: true,
        message: "Validation success",
    }
    const errors = []
    for (const key in hewan_schema) {
        let error;
        if (hewan_schema[key].required && !hewan[key]) {
            error = {
                field: key,
                message: `${key} is required`
            }
        }
        if (hewan_schema[key].type && typeof hewan[key] !== hewan_schema[key].type) {
            if (error) {
                error.message = `${error.message}, ${key} must be a ${hewan_schema[key].type}`;
            }
            else {
                error = {
                    field: key,
                    message: `${key} must be a ${hewan_schema[key].type}`
                }
            }
        }
        if (error) {
            errors.push(error);
        }
    }
    if (errors.length > 0) {
        result.status = false;
        result.message = "Validation failed";
        result.errors = errors;
    }
    console.log(result);
    
    return result;
}
const validateUpdateRequest = (hewan) => {
    
}
module.exports = {
    validateAddRequest
}