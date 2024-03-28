import { CONFIG } from '../config';
import { logger } from '../utils';
import {
  FMIWeatherApiForecastResponse,
  ForecaWeatherApiObservationResponse,
} from './Types/Weather.types';

export class WeatherAPI {
  async fetchForecastData(): Promise<FMIWeatherApiForecastResponse> {
    const response = await fetch(
      `${CONFIG.WEATHER_FMI_API}/forecasts` +
        `?place=${process.env.WEATHER_PLACE}` +
        `&area=${process.env.WEATHER_CITY}`
    );

    if (!response.ok) {
      logger.info(
        `Something went wrong while fetching observations: ${response.status}, ${response.statusText}`
      );
      throw response;
    }

    return response.json();
  }

  async fetchCurrentData(): Promise<ForecaWeatherApiObservationResponse> {
    const response = await fetch(
      `${CONFIG.WEATHER_FORECA_API}/recent` +
        `/${process.env.WEATHER_LOCATION_ID}.json`
    );

    if (!response.ok) {
      logger.info(
        `Something went wrong while fetching observations: ${response.status}, ${response.statusText}`
      );
      throw response;
    }

    return response.json();
  }
}
