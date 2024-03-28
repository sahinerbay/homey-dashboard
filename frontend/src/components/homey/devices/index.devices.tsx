import { Heater } from './heater.devices';
import { Sensor } from './sensor.devices';
import { HomeyDevice, HomeyRoomInfoInterface } from '../../../types';

export function Devices({
  deviceList,
  setMotionActivity,
  setWindowActivity,
  setWaterActivity,
  setRoomTempAndHumid,
}: Readonly<DevicesProps>) {
  return (
    <>
      {deviceList.map((item) => {
        const {
          values,
          name: deviceName,
          lastUpdated,
          class: className,
          isOn,
        } = item;

        return Device({
          values,
          deviceName,
          lastUpdated,
          className,
          isOn,
          setMotionActivity,
          setWindowActivity,
          setWaterActivity,
          setRoomTempAndHumid,
        });
      })}
    </>
  );
}
export const Device = ({
  className,
  values,
  ...rest
}: DeviceProps) => {
  switch (className) {
    case 'sensor':
      return <Sensor values={values as number[]} {...rest} />;
    case 'thermostat':
      return <Heater values={values as number[]} {...rest} />;
    default:
      return null; // You may want to handle unknown device types
  }
};

interface DevicesProps {
  deviceList: HomeyDevice[];
  setMotionActivity: (isActiveMotion: boolean) => void;
  setWindowActivity: (isWindowOpen: boolean) => void;
  setWaterActivity: (isWet: boolean) => void;
  setRoomTempAndHumid: (
    roomTempAndHumid: HomeyRoomInfoInterface | null
  ) => void;
}

interface DeviceProps {
  className: 'thermostat' | 'sensor';
  isOn: boolean | undefined;
  values: number[] | boolean[];
  deviceName: string;
  lastUpdated: string;
  setMotionActivity: (isActiveMotion: boolean) => void;
  setWindowActivity: (isWindowOpen: boolean) => void;
  setWaterActivity: (isWet: boolean) => void;
  setRoomTempAndHumid: (
    roomTempAndHumid: HomeyRoomInfoInterface | null
  ) => void;
}
