import {
  HomeyApiDeviceResponse,
  HomeyCapabilities,
} from './../Types/Homey.devices.types';
import { HomeyApiUsersResponse } from './../Types/Homey.users.types';
import { CONFIG } from './../../config';
import { HomeyUserPresence } from './../../Controllers/devices/types.devices';
import { getTimeDifferenceInMinutes } from './../../utils';

export class HomeyUtils {
  static getUsersPresence(usersResp: HomeyApiUsersResponse) {
    const usersEntries = Object.entries(usersResp);

    return usersEntries.reduce((result, [id, data]) => {
      result.push({
        name: data.name.split(' ')[0],
        isHome: data.present,
      });
      return result;
    }, [] as HomeyUserPresence[]);
  }

  static getUserFavoriteDevices(usersResp: HomeyApiUsersResponse) {
    const usersEntries = Object.entries(usersResp);

    const user = usersEntries.filter(
      ([key, value]) => value.athomId === process.env.HOMEY_USER_ID
    );
    const { favoriteDevices } = user[0][1].properties;
    return favoriteDevices;
  }

  static normalizeCapabilities(
    device: HomeyApiDeviceResponse
  ): HomeyCapabilities {
    const datesArr: string[] = [];
    const normResp = <HomeyCapabilities>{
      capabilities: [],
      values: [],
      icon: device.iconObj.id,
      class: device.class,
    };

    const capabilitiesSorted = device.capabilities
      .filter((capability) =>
        CONFIG.HOMEY_DEVICE_CAPABILITIES.includes(capability)
      )
      .sort((a, b) => b.localeCompare(a));

    capabilitiesSorted.forEach((capability) => {
      const capabilityItem = device.capabilitiesObj[capability];

      if (capabilityItem) {
        normResp.capabilities.push(capability);
        //  @ts-ignore
        normResp.values.push(capabilityItem.value);
        datesArr.push(capabilityItem.lastUpdated);
      }
    });

    // Convert each date string to a Date object
    const dateObjects = datesArr.map(
      (dateString) => new Date(dateString)
    );

    // Find the maximum timestamp (most recent date)
    const maxTimestamp = Math.max(
      ...dateObjects.map((date) => date.getTime())
    );

    // Convert the timestamp back to a Date object
    const mostRecentDate = new Date(maxTimestamp).toISOString();

    normResp.lastUpdated = getTimeDifferenceInMinutes(mostRecentDate);

    if (device.capabilities.includes('onoff')) {
      normResp.isOn = device.capabilitiesObj['onoff']
        .value as boolean;
    }

    return normResp;
  }
}
