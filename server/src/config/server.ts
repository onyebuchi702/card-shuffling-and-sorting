import { Express } from "express";

export const PORT = process.env.PORT || 3001;

export const startServer = (app: Express) => {
  return app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
