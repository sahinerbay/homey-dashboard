import Grid from '@mui/material/Grid';
import { ZoneTitle } from './header.zones';
import { HomeyZoneDetail } from '../../../types';
import { BorderStyle } from './../../../tokens';
import { Heater } from '../devices/heater.devices';
import { SensorOther } from '../sensor/other.sensor';
import { SensorHumidAndTemp } from '../sensor/temp_humid.sensor';

export function Zone({ zoneName, zoneDeviceList }: HomeyProps) {
  
  const { sensor, heater } = zoneDeviceList;
  const { currentTemp, targetTemp } = heater || { currentTemp: 0, targetTemp: 0 };
  const isTempRising = currentTemp <= targetTemp 

  return (
    <Grid
      xs={6}
      key={zoneName}
      border={BorderStyle}
      className={zoneName}
      container
      style={isTempRising ? { backgroundColor: '#bebbbb'} : {}}
    >
      <ZoneTitle zoneName={zoneName} />
      <SensorOther isMotion={sensor?.isMotion} isOpen={sensor?.isWindowOpen} isWet={sensor?.isWater} isTempRising={isTempRising} />
      <SensorHumidAndTemp temp={sensor?.temp || heater?.internalTemp} humid={sensor?.humid} />
      <Heater
        currentTemp={currentTemp}
        targetTemp={targetTemp}
        isOn={heater?.isOn}
      />
    </Grid>
  );
}

interface HomeyProps {
  zoneName: string;
  zoneDeviceList: HomeyZoneDetail;
}
