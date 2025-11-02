import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

// Start local server for development: `node backend/src/server.js`
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server started on port:", PORT);
    });
}).catch((err) => {
    console.error('Failed to connect DB and start server', err);
});
