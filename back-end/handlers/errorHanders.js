
// catch  errors 
exports.catchErrors = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => {
            if (typeof err === "string") {
                res.status(400).json({
                    message: err,
                });
            } else {
                next(err);
            }
        });
    }
}




































































/*
// mongoose errors 

exports.mongooseErrors = (err, req, res, next) => {
    if (!err.errors) return next(err);
    const errorKeys = Object.keys(err.errors);
    let message = "";
    errorKeys.forEach((key) => (message += err.errors[key].message + ", "));
    message = message.substr(0, message.length - 2);
    res.status(400).json({
        message,
    });
};

// Development Errors

exports.DevelopmentErrors = (err, req, res, next) => {
    res.stack = err.stack || "";
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack,
    };

    res.status(err.status || 500).json(errorDetails);
};

// Sever Errors 

exports.propductionErrors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        error: "Internal Server Error",
    });
};

//Page Not found Error

exports.notFound = () => {
    res.status(404).json({
        message: "Route not found",
    });
};
*/