import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { CurrentWeather } from './current.weather';
import { ForecastByHour } from './forecastByHour.weather';
import { ForecastByDay } from './forecastByDay.weather';
import { Precipitation } from './precipitation.weather';
import { FallbackDisplay } from './../misc/fallbackDisplay';
import {
  DayLength,
  WeatherApiResponse,
  HomeyCapabilitiesExtended,
} from '../../types';
import { BorderStyle } from './../../tokens';

export default function Weather({
  setDayLength,
  outdoorSensor,
}: Readonly<WeatherProps>) {
  const [weatherData, setWeatherData] =
    useState<WeatherApiResponse | null>(null);

  const backendUrl = `${process.env.REACT_APP_LOCAL_API_URL}:${process.env.REACT_APP_LOCAL_API_PORT}`;

  useEffect(() => {
    fetch(`${backendUrl}/weather`)
      .then((response) => response.json())
      .then((json) => {
        setWeatherData(json);
        setDayLength(json.dayLength);
      })
      .catch((error) => console.error(error));
  }, []);

  if (weatherData === null) return <FallbackDisplay text="N/A" />;

  return (
    // #Homey used when Puppeteer takes screenshot
    <Grid
      container
      m={0}
      border={BorderStyle}
      id="Weather"
      columns={15}
    >
      <Grid item xs={3}>
        <CurrentWeather
          data={weatherData.current}
          outdoorSensor={outdoorSensor}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container m={0}>
          <ForecastByDay data={weatherData.forecastByDay} />
          <ForecastByHour data={weatherData.forecastByHour} />
          <Precipitation data={weatherData.forecastByHour} />
        </Grid>
      </Grid>
    </Grid>
  );
}
interface WeatherProps {
  setDayLength: (dayLength: DayLength) => void;
  outdoorSensor: HomeyCapabilitiesExtended | null;
}
