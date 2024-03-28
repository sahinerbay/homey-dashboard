import { HomeyApiDeviceResponse } from './Types/Homey.devices.types';
import { HomeyApiUsersResponse } from './Types/Homey.users.types';
import { logger } from './../utils';

export class Homey {
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  async fetchUsers(): Promise<HomeyApiUsersResponse> {
    const response = await fetch(
      `https://${process.env.HOMEY_CLOUD_ID}.connect.athom.com` +
        `/api/manager/users/user`,
      {
        headers: {
          authorization: 'Bearer ' + this.token,
        },
      }
    );

    if (!response.ok) {
      logger.info(
        `Something went wrong while fetching users: ${response.status}, ${response.statusText}`
      );
      throw response;
    }

    return response.json();
  }

  async fetchDevices(): Promise<HomeyApiDeviceResponse> {
    const response = await fetch(
      `https://${process.env.HOMEY_CLOUD_ID}.connect.athom.com` +
        `/api/manager/devices/device`,
      {
        headers: {
          authorization: 'Bearer ' + this.token,
        },
      }
    );

    if (!response.ok) {
      logger.info(
        `Something went wrong while fetching devices: ${response.status}, ${response.statusText}`
      );
      throw response;
    }

    return response.json();
  }
}
