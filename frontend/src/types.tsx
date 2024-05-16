export interface CurrentForecastItem {
  temp: number;
  flike: number;
  symb: string | number;
  time: string;
}

export interface UpdatedAt {
  current: number;
  forecast: number;
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


export interface DayLength {
  sunrise: string;
  sunset: string;
  lengthofday: string;
}

export interface WeatherApiResponse {
  current: CurrentForecastItem;
  forecastByHour: ForecastByHourItem[];
  forecastByDay: ForecastByDayItem[];
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
