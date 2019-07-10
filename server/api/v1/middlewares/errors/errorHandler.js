const errors = {
    validationError: (res, errObject) => res.status(422).json({
        status: 'error',
        error: 'One or more fields raised validation error',
        fields: errObject
    }),
    conflictError: (res, message) => res.status(409).json({
        status: 'error',
        error: message
    }),
    serverError: res => res.status(500).json({
        status: 'error',
        error: 'An unexpected event occured. Please try again later'
    }),
    notFoundError: (res, message) => res.status(404).json({
        status: 'error',
        error: message
    }),
    badRequestError: (res, message) => res.status(400).json({
        status: 'error',
        error: message
    })
};

export default errors;
