export const SuccessResponse = ( res, message, result) => {
    const data = {
        status: 1,
        message: message,
        result: result ?? {}
    };
    res.status(200).json(data);
};

export const DataErrorResponse = ( res, message, result) => {
    const data = {
        status: 0,
        message: message,
        result: result ?? {}
    };
    res.status(400).json(data);
};
export const authErrorResponse = ( res, message, result) => {
    const data = {
        status: 0,
        message: message,
        result: result ?? {}
    };
    res.status(403).json(data);
};
export const ErrorResponse = ( res, message, result) => {
    const data = {
        status: 0,
        message: message,
        result: result ?? {}
    };
    res.status(500).json(data);
};

