import serverless from 'serverless-http';
import { connectDB } from '../backend/src/config/db.js';

let handler;

export default async function (req, res) {
  if (!handler) {
    // Dynamically import the Express app so we reuse the same app code
    const { default: app } = await import('../backend/src/app.js');
    handler = serverless(app);
  }
  // ensure DB connection is established (connectDB caches connections)
  await connectDB();
  return handler(req, res);
}
