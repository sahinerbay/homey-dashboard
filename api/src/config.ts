export const CONFIG = {
  HOMEY_AUTH_API: 'https://api.athom.com',
  HOMEY_AUTH_ACCOUNT: 'https://accounts.athom.com',
  HOMEY_AUTH_REDIRECT_URL: 'http://localhost',
  HOMEY_TOKEN: '',
  HOMEY_TOKEN_EXPIRED_AT: Date.now(),
  HOMEY_DEVICE_CAPABILITIES: [
    'alarm_contact',
    'alarm_motion',
    'alarm_water',
    'measure_temperature',
    'measure_humidity',
    'target_temperature',
    'measure_temperature.internal'
  ],
  HOMEY_VIRTUAL_ZONES: ['Day', 'Presence', 'Season', 'Manual'],
  WEATHER_FMI_API: 'https://en.ilmatieteenlaitos.fi/api/weather',
  WEATHER_FORECA_API: 'https://api.foreca.net/data',
  WEATHER_HOUR_RANGE: 4,
  WEATHER_DAY_RANGE: 4,
  WEATHER_DAY_MORNING_TIME: 9,
  WEATHER_DAY_EVENING_TIME: 21,
};
