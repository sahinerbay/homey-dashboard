import path from 'path';

//  Load .env file only when running the app in local development environment:
if (process.env.NODE_ENV === 'local') {
  require('dotenv').config({
    path: path.resolve(__dirname, './.env'),
  });
}

import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { WeatherCotroller } from './Controllers/weather/controllers.weather';
import { DevicesController } from './Controllers/devices/controllers.devices';
import AuthMiddleware from './middleware.auth';

const app: Application = express();
const port = process.env.PORT || 8000;

const allowedCorsOrigin = process.env.ALLOWED_CORS_ORIGINS || '*';

app.use(cors({ origin: allowedCorsOrigin }));

app.use(
  morgan('combined', {
    skip: (req) => req.url === '/health' || req.url === '/',
  })
);

app.get('/weather', WeatherCotroller);
app.get('/devices', AuthMiddleware, DevicesController);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});

// https://192-168-100-154.homey.homeylocal.com/api/manager/devices/device
// http://192.168.100.154/api/manager/devices/device
// https://5ebaabeb65d85f5ac41db593.connect.athom.com/api/manager/devices/device
// https://5ebaabeb65d85f5ac41db593.connect.athom.com/icon/7a70ade481a3d351d9c883d2d793e532/icon.svg
