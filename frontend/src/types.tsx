export interface CurrentForecastItem {
  temp: number;
  flike: number;
  symb: string | number;
}

export interface UpdatedAt {
  current: number;
  forecast: number;
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

export interface DayLength {
  sunrise: string;
  sunset: string;
  lengthofday: string;
}

export interface WeatherApiResponse {
  current: CurrentForecastItem;
  forecastByHour: ForecastByHourItem[];
  forecastByDay: ForecastByDayData;
  updatedAt: UpdatedAt;
  dayLength: DayLength;
}

export interface HomeyRoomInfoInterface {
  temperature: string;
  humidity: string;
}

export interface HomeyCapabilities {
  capabilities: string[];
  values: number[] | boolean[];
  lastUpdated: string;
  icon: string;
  class: 'thermostat' | 'sensor';
  isOn?: boolean;
}
export interface HomeyDevice extends HomeyCapabilities {
  id?: string;
  name: string;
}
export interface HomeyCapabilitiesExtended extends HomeyDevice {
  zone: string;
}
export interface HomeyDevicesPerZone {
  [zone: string]: HomeyZoneDetail;
}
export interface HomeyUserPresence {
  name: string;
  isHome: boolean;
}
export interface HomeyModeInfo {
  Day: string;
  Presence: string;
  Season: string;
  Manual: boolean;
}
export interface HomeyMoreInfo {
  users: HomeyUserPresence[] | undefined;
  modes: HomeyModeInfo;
  outdoorSensor: HomeyCapabilitiesExtended | undefined;
}
export interface HomeyZoneDetailHeater {
  internalTemp: number | undefined;
  currentTemp: number;
  targetTemp: number;
  isOn: boolean;
}

export interface HomeyZoneDetailSensor {
  temp: number | undefined;
  humid: number | undefined;
  isMotion: boolean | undefined;
  isWater: boolean | undefined;
  isWindowOpen: boolean | undefined;
}

export interface HomeyZoneDetail {
  heater: HomeyZoneDetailHeater | undefined,
  sensor: HomeyZoneDetailSensor | undefined 
}
export interface HomeyApiResponse {
  devices: HomeyZoneDetail;
  misc: HomeyMoreInfo;
}

interface Stoptime {
  scheduledArrival: number;
  realtimeArrival: number;
  arrivalDelay: number;
  trip: {
    route: {
      shortName: string;
      longName: string;
    };
  };
}

export interface Stop {
  name: string;
  desc: string;
  code: string;
  stoptimesWithoutPatterns: Stoptime[];
}

// Top-level type
interface StopData {
  stop: Stop;
}

export interface HSLApiResponse {
  data: StopData;
}
