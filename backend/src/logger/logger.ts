const pino = require('pino')
import dayjs from "dayjs";

const pretty = require('pino-pretty')
const stream = pretty({
    levelFirst: true,
    translateTime: 'yyyy-dd-mm, HH:MM:ss',
    colorize: true,
});

const log = pino({
    base: {
        pid: false
    }
}, stream)

export default log;