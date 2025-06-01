import express from "express";
import type { Request, Response, NextFunction } from "express";
import {
  config,
  handlerMetricsReset,
  middlewareMetricsIncrement,
} from "./config.js";

const app = express();
const PORT = 8080;

const middlewareLogResponses = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.on("finish", () => {
    if (res.statusCode !== 200) {
      console.log(
        `[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`
      );
    }
  });
  next();
};

app.use(middlewareLogResponses);
app.use(middlewareMetricsIncrement);

app.use("/app", express.static("./src/app"));

const handlerReadiness = (req: Request, res: Response) => {
  res.status(200).contentType("text/plain; charset=utf-8").send("OK");
};

const handlerMetrics = (req: Request, res: Response) => {
  res
    .status(200)
    .contentType("text/plain; charset=utf-8")
    .send(`Hits: ${config.fileserverHits}`);
};

app.get("/api/healthz", handlerReadiness);
app.get("/api/metrics", handlerMetrics);
app.get("/api/reset", handlerMetricsReset);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
