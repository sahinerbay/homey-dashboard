//  Device Id changes everytime added/removed but the name stays same.
/*  
          !!!! IMPORTANT NOTE!!!!
  In order to see the device on the UI do the following:
  Make sure your device is marked as favorite on Homey App and 
  The device name is added to the mapping below. 
*/

export const DEVICE_MAPPING = {
  'Living Room Heater Left': 'Wall',
  'Living Room Heater Right': 'Wall',
  'Living Room Humidity and Temperature Sensor': 'Sensor',
  'Living Room Motion Sensor': 'Motion',
  'Office Heater': 'Wall',
  'Office Humidity and Temperature Sensor': 'Sensor',
  'Office Motion Sensor': 'Motion',
  'Office Window Sensor': 'Window',
  'Bedroom Heater': 'Wall',
  'Bedroom Humidity and Temperature Sensor': 'Sensor',
  'Bedroom Motion Sensor': 'Motion',
  'Bedroom Window Sensor': 'Window',
  'CO Sensor': 'CO2',
  'Smoke Sensor': 'Smoke',
  'Air Quality Sensor': 'TVOC',
  'Kids Heater': 'Wall',
  'Kids Humidity and Temperature': 'Sensor',
  'Kids Motion Sensor': 'Motion',
  'Kids Window Sensor': 'Window',
  'Kitchen Floor Thermostat': 'Floor',
  'Kitchen Motion Sensor': 'Hue',
  'Kitchen Water Sensor': 'Wet',
  'Household Floor Thermostat': 'Floor',
  'Household Motion Sensor': 'Motion',
  'Household Humidity and Temperature Sensor': 'Sensor',
  'Household Water Sensor': 'Wet',
  'Restroom Floor Thermostat': 'Floor',
  'Restroom Humidity and Temperature Sensor': 'Sensor',
  'Restroom Sensor': 'Motion',
  'Restroom Water Sensor': 'Wet',
  'Entrance Floor Thermostat': 'Floor',
  'Entrance Motion Sensor': 'Motion',
  'Entrance Humidity and Temperature Sensor': 'Sensor',
  'Bathroom Humidity and Temperature Sensor': 'Sensor',
  'Bathroom Floor Thermostat': 'Floor',
};

export const FORECA_IMAGE_URL =
  'https://developer.foreca.com/static/images/symbols';
export const FMI_IMAGE_URL =
  'https://cdn.fmi.fi/symbol-images/smartsymbol/v3/p';
export const HOMEY_API_URL =
  'https://5ebaabeb65d85f5ac41db593.connect.athom.com';
export const HSL_API_URL =
  'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

export const round = (value: number, decimals: number): number => {
  return Number(Math.round(Number(value * decimals)) / decimals);
};
