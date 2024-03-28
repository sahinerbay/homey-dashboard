import { CONFIG } from '../../config';
import { ForecastValues } from './../Types/Weather.types';
import { Edays } from './../../Controllers/weather/types.weather';

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export class WeatherUtils {
  static cleanForecastData = (forecastValues: ForecastValues[]) => {
    return forecastValues.map((forecast: ForecastValues) => {
      return {
        day: dayNames[
          new Date(forecast.isolocaltime).getDay()
        ] as Edays,
        time: forecast.localtime
          .split('T')[1]
          .slice(0, 4)
          .replace(/(\d{2})(\d{2})/, '$1:$2'),
        temp: Math.round(forecast.Temperature * 10) / 10,
        flike: Math.round(forecast.FeelsLike * 10) / 10,
        symb: forecast.SmartSymbol,
        pop: Math.round(forecast.PoP),
        precipitation:
          Math.round(forecast.Precipitation1h * 100) / 100,
      };
    });
  };

  static filterHourlyForecast(forecastValues: ForecastValues[]) {
    const hoursRange = CONFIG.WEATHER_HOUR_RANGE;
    return forecastValues
      .filter((_, i) => i % 3 === 0)
      .slice(1, hoursRange + 1);
  }

  static filterDailyForecast(forecastValues: ForecastValues[]) {
    const daysRange = CONFIG.WEATHER_DAY_RANGE;
    const morningTime = CONFIG.WEATHER_DAY_MORNING_TIME;
    const eveningTime = CONFIG.WEATHER_DAY_EVENING_TIME;
    const timestamps: string[] = [];

    for (let i = 0; i < daysRange; i++) {
      const currentDateMorning = this.generateTimeFormatByHour(
        i * 24 + morningTime
      );
      timestamps.push(currentDateMorning);

      const currentDateEvening = this.generateTimeFormatByHour(
        i * 24 + eveningTime
      );
      timestamps.push(currentDateEvening);
    }

    return forecastValues.filter((forecast) => {
      const forecastDateIso = forecast.isolocaltime;
      return timestamps.includes(forecastDateIso);
    });
  }

  static mergeByDay = (forecastValues: ForecastValues[]) => {
    return this.cleanForecastData(forecastValues).reduce(
      (acc, obj) => {
        const { day, ...rest } = obj;

        if (!acc[day]) {
          acc[day] = [];
        }

        acc[day].push(rest);
        return acc;
      },
      {} as any
    );
  };

  static generateTimeFormatByHour = (hour: number) => {
    const plainDay = Math.floor(hour / 24);
    const plainHour = hour % 24;

    // Get the current date and time
    const currentDate = new Date();
    // Set the time i.e 9 AM
    currentDate.setHours(plainHour, 0, 0, 0);
    // Add day to the current date i.e. 1 day
    currentDate.setDate(currentDate.getDate() + plainDay + 1);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const currentDateIso = `${year}-${month}-${currentDay}T${hours}:${minutes}:${seconds}`;
    return currentDateIso;
  };
}
