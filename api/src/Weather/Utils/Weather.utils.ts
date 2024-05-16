import { CONFIG } from '../../config';
import { ForecastValues, } from './../Types/Weather.types';
import { Edays, ForecastByDayItem } from './../../Controllers/weather/types.weather';

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

  static filterDailyForecast(forecastValues: ForecastValues[]): ForecastByDayItem[] {
    const daysRange = CONFIG.WEATHER_DAY_RANGE;

    // Create a map to group temperatures by date
    const temperatureMap = forecastValues.reduce((map, forecast) => {
      // Extract date from timestamp
      const day = dayNames[new Date(forecast.isolocaltime).getDay()]

      // Add temperature and timestamp to corresponding date in the map
      if (!map.has(day)) {
        map.set(day, []);
      }
      map.get(day).push({ temperature: Math.round(forecast.Temperature * 10)/10, timestamp: forecast.isolocaltime, symb: forecast.SmartSymbol });

      return map;
    }, new Map());

    // Iterate over temperature map to find highest and lowest temperature per day
    return Array.from(temperatureMap.entries()).slice(1, daysRange +1).map(([day, temperatures]) => {
      const temperaturesForDay: number[] = temperatures.map((entry: { temperature: number; }) => entry.temperature);
      const lowestTemp: number = Math.min(...temperaturesForDay);
      const highestTemp: number = Math.max(...temperaturesForDay);
      const lowestTempTimestamp: string = temperatures.find((entry: { temperature: number; }) => entry.temperature === lowestTemp).timestamp.split('T')[1].substring(0, 5);
      const highestTempTimestamp: string = temperatures.find((entry: { temperature: number; }) => entry.temperature === highestTemp).timestamp.split('T')[1].substring(0, 5);
      const lowestTempSymbol: number = temperatures.find((entry: { temperature: number; }) => entry.temperature === lowestTemp).symb;
      const highestTempSymbol: number = temperatures.find((entry: { temperature: number; }) => entry.temperature === highestTemp).symb;

      return { day, lowest:[lowestTemp, lowestTempTimestamp, lowestTempSymbol], highest:[highestTemp, highestTempTimestamp, highestTempSymbol]};
    })
  }

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
