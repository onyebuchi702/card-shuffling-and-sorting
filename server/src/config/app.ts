import express from "express";
import cors from "cors";
import apiRoutes from "../routes/api";
import { notFoundHandler, errorHandler } from "../middleware/errorHandlers";

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api", apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
