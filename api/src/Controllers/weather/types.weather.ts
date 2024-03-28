interface CurrentForecastItem {
  temp: number;
  flike: number;
  symb: string | number;
}

export interface ForecastByDayItem extends CurrentForecastItem {
  time: string;
}

export interface ForecastByHourItem extends ForecastByDayItem {
  day: Edays;
  pop: number;
  precipitation: number;
}

export type Edays =
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'
  | 'Monday'
  | 'Tuesday';

export type ForecastByDayData = {
  [day in Edays]: ForecastByDayItem[];
};

interface DayLength {
  sunrise: string;
  sunset: string;
  lengthofday: string;
}

export interface WeatherApiResponse {
  current: CurrentForecastItem;
  forecastByHour: ForecastByHourItem[];
  forecastByDay: ForecastByDayData;
  updatedAt: {
    current: string;
    forecast: string;
  };
  dayLength: DayLength;
}
