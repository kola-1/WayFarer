import Joi from '@hapi/joi';
import Schema from './validationSchema';
import Errors from '../errors/errorHandler';

const { authSchema } = Schema;
const { validationError } = Errors;

const validator = (data, obj, schema) => {
    const errObj = {};
    let isError = false;
    data.forEach((val) => {
        const { error } = Joi.validate({ val: obj[val] }, { val: schema[val] });

        if (error !== null) {
            isError = true;
            errObj[val] = error.details[0].message.replace('"val"', val);
        }
    });

    if (isError) {
        return errObj;
    }

    return null;
};

const sendError = (req, res, next, errObj) => ((errObj !== null)
    ? validationError(res, errObj) : next());


const validateRequest = (req, res, next, dataArray) => {
    const data = dataArray;
    const obj = {};
    obj.req = req.body;
    const errObj = validator(data, obj.req, authSchema);
    sendError(req, res, next, errObj);
};

export default { validator, sendError, validateRequest };
