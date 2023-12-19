import winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = (): string =>
  process.env.NODE_ENV === 'production' ? 'warn' : 'debug';

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss:ms',
  }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    info => `[${info.timestamp as string}] ${info.message as string}`,
  ),
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: `${__dirname}/../../logs/error.log`,
    level: 'error',
  }),
  new winston.transports.File({
    filename: `${__dirname}/../../logs/all.log`,
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default logger;
