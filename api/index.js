import serverless from 'serverless-http';
import { connectDB } from '../backend/src/config/db.js';

// Dynamically import the Express app (ESM) so we reuse the same app code
const { default: app } = await import('../backend/src/app.js');
const handler = serverless(app);

export default async function (req, res) {
  // ensure DB connection is established (connectDB caches connections)
  await connectDB();
  return handler(req, res);
}
