import { HomeyCapabilities } from '../../Homey/Types/Homey.devices.types';

export interface HomeyDevice extends HomeyCapabilities {
  id?: string;
  name: string;
}
export interface HomeyCapabilitiesExtended extends HomeyDevice {
  zone: string;
}
export interface HomeyDevicesPerZone {
  [zone: string]: HomeyCapabilitiesExtended[];
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
export interface HomeyApiResponse {
  devices: HomeyDevicesPerZone;
  misc: HomeyMoreInfo;
}
