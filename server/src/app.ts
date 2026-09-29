import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config/index.js";
import { routes } from "./routes/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { rateLimiter } from "./middleware/rateLimiter.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: config.clientUrl,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));

  app.use("/api", rateLimiter, routes);

  app.use(errorHandler);

  return app;
}
