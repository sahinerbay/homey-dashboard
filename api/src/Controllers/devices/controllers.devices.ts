import { Request, Response, NextFunction } from 'express';
import { Homey } from './../../Homey/Homey';
import { CONFIG } from './../../config';
import { HomeyUtils } from './../../Homey/Utils/Homey.utils';
import {
  HomeyApiResponse,
  HomeyDevicesPerZone,
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

      //  Fetch mode data
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
        favoriteDevicesNormalizedPerZone[zone] =
          favoriteDevicesNormalizedPerZone[zone] || [];
        favoriteDevicesNormalizedPerZone[zone].push({
          name: value.name,
          zone,
          ...capabilities,
        });
        favoriteDevicesNormalizedPerZone[zone].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
    }

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
