const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/common");
const AppError = require("../utils/error/app.error");

function validate(req, res, next) {
    
    if(req.body.name){
        errorResponse.message = "Name is required";
        errorResponse.error = new AppError(
            ["name can not be empty"],
            StatusCodes.BAD_REQUEST
        );

        return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    next();
}


export  { validate }