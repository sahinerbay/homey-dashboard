import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Devices } from './../devices/index.devices';
import { HeaderZone } from './header.zones';
import { InfoZone } from './info.zones';
import { HomeyDevice, HomeyRoomInfoInterface } from '../../../types';
import { BorderStyle } from './../../../tokens';

export function Zone({ zoneName, zoneDeviceList }: HomeyProps) {
  const [isActiveMotion, setMotionActivity] =
    useState<boolean>(false);

  const [isWindowOpen, setWindowActivity] = useState<boolean>(false);

  const [isWet, setWaterActivity] = useState<boolean>(false);

  const [roomTempAndHumid, setRoomTempAndHumid] =
    useState<HomeyRoomInfoInterface | null>(null);

  return (
    <Grid
      item
      xs={3}
      key={zoneName}
      border={BorderStyle}
      className={zoneName}
    >
      <HeaderZone
        zoneName={zoneName}
        isActiveMotion={isActiveMotion}
        isWindowOpen={isWindowOpen}
        isWet={isWet}
      />
      {roomTempAndHumid && (
        <InfoZone roomTempAndHumid={roomTempAndHumid} />
      )}
      <Devices
        deviceList={zoneDeviceList}
        setMotionActivity={setMotionActivity}
        setWindowActivity={setWindowActivity}
        setWaterActivity={setWaterActivity}
        setRoomTempAndHumid={setRoomTempAndHumid}
      />
    </Grid>
  );
}

interface HomeyProps {
  zoneName: string;
  zoneDeviceList: HomeyDevice[];
}
