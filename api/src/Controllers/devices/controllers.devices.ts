import { Request, Response, NextFunction } from 'express';
import { Homey } from './../../Homey/Homey';
import { CONFIG } from './../../config';
import { HomeyUtils } from './../../Homey/Utils/Homey.utils';
import {
  HomeyApiResponse,
  HomeyDevicesPerZone,
  HomeyZoneDetailHeater,
  HomeyZoneDetailSensor,
} from './types.devices';
import { HomeyApiDeviceResponse } from './../../Homey/Types/Homey.devices.types';

export const DevicesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const resp = {
      devices: {},
      misc: {
        modes: {},
      },
    } as HomeyApiResponse;

    const token = CONFIG.HOMEY_TOKEN;
    const homey = new Homey(token);
    const usersResp = await homey.fetchUsers();
    const devicesResp = await homey.fetchDevices();

    //  Returns presence info of each user with manager rights
    resp.misc.users = HomeyUtils.getUsersPresence(usersResp);

    //  Returns favorite devices of the user
    const favoriteDevices =
      HomeyUtils.getUserFavoriteDevices(usersResp);

    let favoriteDevicesNormalizedPerZone = {} as HomeyDevicesPerZone;

    //  Loop through all devices from Homey API response
    for (const [key, value] of Object.entries(devicesResp)) {
      //  Fetch outdoor sensor data
      if (key === process.env.HOMEY_OUTDOOR_SENSOR_ID) {
        const capabilities = HomeyUtils.normalizeCapabilities(value);
        resp.misc.outdoorSensor = {
          name: value.name,
          zone: value.zoneName,
          ...capabilities,
        };
        continue;
      }

      //  Fetch mode data from Virtual zones
      if (CONFIG.HOMEY_VIRTUAL_ZONES.includes(value.zoneName)) {
        const { name, zoneName, capabilitiesObj } =
          value as HomeyApiDeviceResponse;
        if (capabilitiesObj?.onoff?.value) {
          resp.misc.modes[zoneName as 'Day' | 'Presence' | 'Season'] =
            name;
        }

        if (zoneName === 'Manual') {
          resp.misc.modes['Manual'] = capabilitiesObj?.onoff
            ?.value as boolean;
        }
        continue;
      }

      //  Fetch favorite devices data
      if (favoriteDevices.includes(key)) {
        const capabilities = HomeyUtils.normalizeCapabilities(value);

        const zone = value.zoneName;
        favoriteDevicesNormalizedPerZone[zone] = favoriteDevicesNormalizedPerZone[zone] || {};

        if(capabilities.class === 'sensor') {
          favoriteDevicesNormalizedPerZone[zone].sensor = favoriteDevicesNormalizedPerZone[zone].sensor || {} as HomeyZoneDetailSensor;

          if(capabilities.capabilities.includes('alarm_motion')) {
            const i = capabilities.capabilities.indexOf('alarm_motion');
            favoriteDevicesNormalizedPerZone[zone].sensor!.isMotion = capabilities.values[i] as boolean;
          } 
  
          if(capabilities.capabilities.includes('alarm_water')) {
            const i = capabilities.capabilities.indexOf('alarm_water');
            favoriteDevicesNormalizedPerZone[zone].sensor!.isWater = capabilities.values[i] as boolean;
          }
  
          if(capabilities.capabilities.includes('alarm_contact')) {
            const i = capabilities.capabilities.indexOf('alarm_contact');
            favoriteDevicesNormalizedPerZone[zone].sensor!.isWindowOpen = capabilities.values[i] as boolean;
          }
          
          if(capabilities.capabilities.includes('measure_temperature')) {
            const i = capabilities.capabilities.indexOf('measure_temperature');
            favoriteDevicesNormalizedPerZone[zone].sensor!.temp = Math.round(capabilities.values[i] as number * 10) / 10;
          }

          if(capabilities.capabilities.includes('measure_humidity')) {
            const i = capabilities.capabilities.indexOf('measure_humidity');
            favoriteDevicesNormalizedPerZone[zone].sensor!.humid = Math.round(capabilities.values[i] as number);
          }
        }

        if(capabilities.class === 'thermostat') {
          favoriteDevicesNormalizedPerZone[zone].heater = favoriteDevicesNormalizedPerZone[zone].heater || {} as HomeyZoneDetailHeater;
          favoriteDevicesNormalizedPerZone[zone].heater!.isOn = capabilities.isOn as boolean;

          if(capabilities.capabilities.includes('measure_temperature')) {
            const i = capabilities.capabilities.indexOf('measure_temperature');
            favoriteDevicesNormalizedPerZone[zone].heater!.currentTemp = Math.round(capabilities.values[i] as number * 10) / 10;
          }

          if(capabilities.capabilities.includes('measure_temperature.internal')) {
            const i = capabilities.capabilities.indexOf('measure_temperature.internal');
            favoriteDevicesNormalizedPerZone[zone].heater!.internalTemp = Math.round(capabilities.values[i] as number * 10) / 10;
          }

          if(capabilities.capabilities.includes('target_temperature')) {
            const i = capabilities.capabilities.indexOf('target_temperature');
            favoriteDevicesNormalizedPerZone[zone].heater!.targetTemp = capabilities.values[i] as number;
          }

        }
      }
    }

    const averageByAllDevices = HomeyUtils.calculateAverageTempAndHumid(favoriteDevicesNormalizedPerZone);
    favoriteDevicesNormalizedPerZone['Average'] = averageByAllDevices;

    // Sort keys based on the number of items in the corresponding arrays
    const sortedKeys = Object.keys(
      favoriteDevicesNormalizedPerZone
    ).sort((a, b) => a.localeCompare(b));

    // Create a new object with sorted keys
    const sortedData = {};
    sortedKeys.forEach((key) => {
      const formattedKey = key.replace(/^\d+_|_/g, '');
      // @ts-ignore
      sortedData[formattedKey] = favoriteDevicesNormalizedPerZone[key];
    });

    resp.devices = sortedData;

    res.json(resp);
  } catch (err) {
    next(err);
  }
};
