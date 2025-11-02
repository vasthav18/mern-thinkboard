import mongoose from "mongoose";

/**
 * Connect to MongoDB with caching to work well in serverless environments.
 * Returns the mongoose connection.
 */
export const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('MONGO_URI not set in environment');
    }

    // Use a global variable so that the connection is cached across lambda invocations
    // (prevents exhausting connections and speeds up cold starts)
    if (global._mongoClientPromise && global._mongoClientPromise.conn) {
        return global._mongoClientPromise.conn;
    }

    if (!global._mongoClientPromise) {
        global._mongoClientPromise = {};
        global._mongoClientPromise.promise = mongoose.connect(mongoUri, {
            // use default options or add as needed
        }).then((m) => {
            return m;
        });
        // store conn when resolved
        global._mongoClientPromise.promise.then((m) => {
            global._mongoClientPromise.conn = m;
        });
    }

    await global._mongoClientPromise.promise;
    return global._mongoClientPromise.conn;
};