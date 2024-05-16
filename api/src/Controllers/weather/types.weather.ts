interface CurrentForecastItem {
  temp: number;
  flike: number;
  symb: string | number;
  time: string;
}

export interface ForecastByDayItem {
  day: string;
  lowest: [number, string, number];
  highest: [number, string, number];
}

export interface ForecastByHourItem {
  day: Edays;
  time: string;
  temp: number;
  flike: number;
  symb: number;
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

interface DayLength {
  sunrise: string;
  sunset: string;
  lengthofday: string;
}

export interface WeatherApiResponse {
  current: CurrentForecastItem;
  forecastByHour: ForecastByHourItem[];
  forecastByDay: ForecastByDayItem[];
  updatedAt: {
    current: string;
    forecast: string;
  };
  dayLength: DayLength;
}
