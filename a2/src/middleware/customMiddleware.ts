
import { Request, Response, NextFunction } from "express"

export const unknownEndpoint = (request: Request, response:Response):void => {
  response.status(404).send({ error: "unknown endpoint" });
};

export const errorHandler = (error:Error, request:Request, response:Response, next:NextFunction):void => {
  console.error(error.message);
  response.status(500);
  response.json({
    message: error.message,
  });
};

export const requestLogger = (req:Request, res:Response, next:NextFunction):void => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};
