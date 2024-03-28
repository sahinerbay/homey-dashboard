import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { DEVICE_MAPPING, round } from '../../../config';

export function Heater({ values, deviceName, isOn }: HeaterProps) {
  const currentTemp = round(values[1], 10);
  const targetTemp = round(values[0], 10);
  const isTempRising = currentTemp <= targetTemp ? '▲' : '... ';
  return (
    <Grid
      item
      container
      alignItems={'baseline'}
      style={{ textDecoration: isOn ? 'none' : 'line-through' }}
    >
      <Grid item xs={4}>
        <Typography className="Homey__device Homey__device--align-left">
          {/* @ts-ignore */}
          {DEVICE_MAPPING[deviceName]}
        </Typography>
      </Grid>

      <Grid item xs={8}>
        <Typography className="Homey__device Homey__device--align-right">{`${targetTemp}°${isTempRising}${currentTemp}°`}</Typography>
      </Grid>
    </Grid>
  );
}

interface HeaterProps {
  values: number[];
  deviceName: string;
  isOn: boolean | undefined;
}
