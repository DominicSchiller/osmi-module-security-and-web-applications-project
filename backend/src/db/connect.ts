import mongoose, { Mongoose } from "mongoose";
import log from "../logger/logger";

// const config = require("config");

async function connect() {
    try {
        const mongoUrl = process.env.MONGODB_URL ?? 'mongodb://localhost:27017'
        const connection = await mongoose.connect(mongoUrl, {
                dbName: 'epa-poc',
                user: 'root',
                pass: 'test1234'

            });
        log.info('Database connected');
    } catch (error) {
        log.error(`Database connection failed: ${error}`);
    }
}

export default connect;
