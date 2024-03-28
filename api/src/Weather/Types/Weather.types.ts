interface Coordinates {
  latitude: {
    text: number;
    crs: string;
  };
  longitude: {
    text: number;
    crs: string;
  };
  elevation: {
    text: number;
    unit: string;
  };
}

interface ObservationStation {
  id: number;
  coordinates: Coordinates;
  'start-date': string;
  names: { text: string; lang: string }[];
  descriptions: {
    description: {
      text: string;
      lang: string;
    };
  };
  'visibility-maximum': {
    text: number;
    unit: string;
  };
  groups: { group: string }[] | string[];
}

interface DayLengthValues {
  Sunrise: string;
  Sunset: string;
}

export interface ForecastValues {
  geoid: number;
  name: string;
  localtz: string;
  localtime: string;
  modtime: string;
  SmartSymbol: number;
  Temperature: number;
  FeelsLike: number;
  WindSpeedMS: number;
  WindDirection: number;
  HourlyMaximumGust: number;
  PoP: number;
  Precipitation1h: number;
  isolocaltime: string;
}

interface Location {
  place: string;
  area: string;
  timezone: string;
}

interface SymbolDescriptions {
  id: number;
  text_fi: string;
  text_en: string;
  text_sv: string;
}

export interface FMIWeatherApiForecastResponse {
  municipalityCode: string;
  observationStations: {
    stationData: ObservationStation[];
    dropdownItems: {
      distance: string;
      station: string;
      value: number;
    }[];
  };
  dayLengthValues: DayLengthValues[];
  forecastValues: ForecastValues[];
  location: Location;
  symbolDescriptions: SymbolDescriptions[];
  dayLength: {
    sunrise: string;
    sunset: string;
    lengthofday: string;
  };
  forecastModtime: {
    modtime: string;
    isotime: string;
  };
  fractilesModtime: {
    modtime: string;
    isotime: string;
  };
}

interface ObservationData {
  time: string;
  symb: string;
  temp: number;
  flike: number;
  flikeFCA: number;
  rain: number;
  rainl: number;
  rains: number;
  rainp: number;
  snowp: number;
  windd: number;
  winds: number;
  snowff: number;
  maxwind: number;
  rhum: number;
  pres: number;
  uvi: number;
  updated: string;
}

export interface ForecaWeatherApiObservationResponse {
  [key: string]: ObservationData;
}
