import { createApp } from "./config/app";
import { startServer } from "./config/server";

const app = createApp();

if (process.env.NODE_ENV !== "test") {
  startServer(app);
}

export default app;
