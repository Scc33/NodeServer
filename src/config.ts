import type { Request, Response, NextFunction } from "express";

type APIConfig = {
  fileserverHits: number;
};

export const config: APIConfig = {
  fileserverHits: 0,
};

export function handlerMetricsReset(req: Request, res: Response) {
  config.fileserverHits = 0;
  res.status(200).contentType("text/plain; charset=utf-8").send("OK");
}

export function middlewareMetricsIncrement(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.url.startsWith("/app")) {
    config.fileserverHits++;
  }
  next();
}
