import winston, { format } from 'winston';
import * as child from 'child_process';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new winston.transports.Console()],
});

export const convert = (filename: string) => {
  return new Promise((resolve, reject) => {
    const args = [
      filename,
      '-gravity',
      'center',
      '-resize',
      '1072x1448',
      '-colorspace',
      'gray',
      '-depth',
      '8',
      filename,
    ];
    child.execFile('convert', args, (error, stdout, stderr) => {
      if (error) {
        console.error({ error, stdout, stderr });
        reject();
      } else {
        resolve(filename);
      }
    });
  });
};
