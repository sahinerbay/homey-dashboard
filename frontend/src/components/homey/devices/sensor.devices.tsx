import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DEVICE_MAPPING, round } from '../../../config';
import { HomeyRoomInfoInterface } from '../../../types';

export function Sensor({
  values,
  deviceName,
  setMotionActivity,
  setWindowActivity,
  setWaterActivity,
  setRoomTempAndHumid,
}: Readonly<SensorProps>) {
  //  @ts-ignore
  const deviceType = DEVICE_MAPPING[deviceName];

  useEffect(() => {
    if (deviceType === 'Motion') {
      setMotionActivity(values[0] as boolean);
    }

    if (deviceType === 'Hue') {
      setMotionActivity(values[1] as boolean);
    }

    if (deviceType === 'Window') {
      setWindowActivity(values[0] as boolean);
    }

    if (deviceType === 'Water') {
      setWaterActivity(values[0] as boolean);
    }

    if (['Sensor', 'TVOC'].includes(deviceType)) {
      const roomTempAndHumid = {
        temperature: `${round(values[0] as number, 10)}°`,
        humidity: `${round(values[1] as number, 1)}%`,
      };
      setRoomTempAndHumid(roomTempAndHumid);
    }

    if (deviceType === 'Hue') {
      const updatedRoomTempAndHumid = {
        temperature: `${round(values[0] as number, 10)}°`,
        humidity: 'N/A',
      };
      setRoomTempAndHumid(updatedRoomTempAndHumid);
    }
  }, [deviceType, values]); // Include relevant dependencies in the dependency array

  if (['CO2', 'Smoke'].includes(deviceType)) {
    return (
      <Grid item container alignItems={'baseline'}>
        <Grid item xs={4}>
          <Typography className="Homey__device Homey__device--align-left">
            {deviceType}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography className="Homey__device Homey__device--align-right">
            {`${round(values[0] as any, 10)}°`}
          </Typography>
        </Grid>
      </Grid>
    );
  } else {
    return <></>;
  }
}

interface SensorProps {
  values: number[] | boolean[];
  deviceName: string;
  setMotionActivity: (isActiveMotion: boolean) => void;
  setWindowActivity: (isWindowOpen: boolean) => void;
  setWaterActivity: (isWet: boolean) => void;
  setRoomTempAndHumid: (
    roomTempAndHumid: HomeyRoomInfoInterface | null
  ) => void;
}
