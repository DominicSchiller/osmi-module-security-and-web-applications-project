import express, { Application } from "express";
import log from "./logger/logger";
import connect from "./db/connect";
import routes from "./routing/routes";

const expressPinoLogger = require('express-pino-logger');

const loggerMiddleware = expressPinoLogger({
    logger: log,
    autoLogging: true,
});

const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:8787',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

// App setup
const app: Application = express();
app.use(cors(corsOptions))
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(8686, async () => {
    log.info(`Server listening on http://localhost:8686`);
    await connect();
    routes(app);
})