import express from 'express';



export const token = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    req.headers['token'] = req.headers.authorization;
    return next();

};
