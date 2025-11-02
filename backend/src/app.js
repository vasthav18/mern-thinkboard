import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

const app = express();

// middleware
const corsOrigin = process.env.CORS_ALLOWED_ORIGIN || (process.env.NODE_ENV !== 'production' ? 'http://localhost:5173' : undefined);
if (corsOrigin) {
  app.use(cors({ origin: corsOrigin, credentials: true }));
} else {
  if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
  }
}

app.use(express.json());
app.use(rateLimiter);

// health endpoint
app.get('/health', (req, res) => {
  return res.json({ status: 'ok', uptime: process.uptime() });
});

app.use("/api/notes", notesRoutes);

// static serving when deployed as a full server (not serverless)
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  });
}

export default app;
