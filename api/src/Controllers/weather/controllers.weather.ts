import { Request, Response, NextFunction } from 'express';
import { WeatherAPI } from './../../Weather/Weather.api';
import { WeatherUtils } from './../../Weather/Utils/Weather.utils';
import {
  formatDayLength,
  formatUpdatedAt,
  getTimeDifferenceInMinutes,
  setUTCForecastTimestamp,
} from './../../utils';
import { WeatherApiResponse } from './types.weather';

export const WeatherCotroller = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const weatherAPI = new WeatherAPI();

    /* Handle Current Data */
    const currentDataResp = await weatherAPI.fetchCurrentData();
    const currentObservation =
      currentDataResp[process.env.WEATHER_LOCATION_ID as string];
    const { symb, temp, flike, updated } = currentObservation;
    const observationAgeInMin = getTimeDifferenceInMinutes(updated);
    const timestamp = new Date(updated);
    const hours = timestamp.getHours();
    let minutes: number | string = timestamp.getMinutes();
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    /* Handle Forecast Data */
    const forecastResp = await weatherAPI.fetchForecastData();
    const { dayLength, forecastModtime, forecastValues } =
      forecastResp;
    const { lengthofday } = dayLength;

    dayLength.lengthofday = formatDayLength(lengthofday);

    const forecastAgeInMin = getTimeDifferenceInMinutes(
      setUTCForecastTimestamp(forecastModtime.isotime)
    );
    const forecastByHour =
      WeatherUtils.filterHourlyForecast(forecastValues);
    const forecastByDay =
      WeatherUtils.filterDailyForecast(forecastValues);
      
    const resp: WeatherApiResponse = {
      current: {
        temp,
        flike,
        symb,
        time: `${hours}:${minutes}`,
      },
      forecastByHour: WeatherUtils.cleanForecastData(forecastByHour),
      forecastByDay,
      updatedAt: {
        current: formatUpdatedAt(observationAgeInMin),
        forecast: formatUpdatedAt(forecastAgeInMin),
      },
      dayLength,
    };

    res.send(resp);
  } catch (err) {
    next(err);
  }
};
