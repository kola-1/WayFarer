import Joi from '@hapi/joi';

// regex that matches only alphabets with no space and is case insensitive
const nameRegex = /^[a-zA-Z]+$/i;

const nameObject = name => ({
    name,
});

const Schema = {
    authSchema: {
        first_name: Joi.string().regex(nameRegex, nameObject('case insensitive alphabets without space')).min(3).max(25)
            .required(),
        last_name: Joi.string().regex(nameRegex, nameObject('case insensitive alphabets without space')).min(3).max(25)
            .required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    },
    tripSchema: {
        trip_id: Joi.number().integer().positive().required(),
        bus_id: Joi.number().integer().positive().required(),
        origin: Joi.string().required(),
        destination: Joi.string().required(),
        trip_date: Joi.date(),
        fare: Joi.number().positive().max(999999).required()
    },
    busSchema: {
        number_plate: Joi.string().required(),
        manufacturer: Joi.string().required(),
        model: Joi.string().required(),
        year: Joi.number().positive().required(),
        capacity: Joi.number().positive().max(100).required()
    },
    userSchema: {
        user_id: Joi.number().integer().positive(),
        is_admin: Joi.string().valid('true', 'false')
    },
    bookingSchema: {
        seat_number: Joi.number().integer().positive(),
    },
};

export default Schema;
