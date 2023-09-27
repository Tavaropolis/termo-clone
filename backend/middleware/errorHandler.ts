const errorHandler = (err: any, req: any, res: any, next: any) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case 400: 
            res.json({
                title: "Validation Failed",
                message: err.message
            });
            break;
        case 401: 
            res.json({
                title: "Unauthorized",
                message: err.message
            });
            break;
        case 403: 
            res.json({
                title: "Forbidden",
                message: err.message
            });
            break;
        case 404: 
            res.json({
                title: "Not Found",
                message: err.message
            })
            break;
        default:
            break;
    }
}

export default errorHandler;

