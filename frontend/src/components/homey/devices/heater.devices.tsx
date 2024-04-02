import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


export function Heater({ currentTemp, targetTemp, isOn }: HeaterProps) {
  if(!currentTemp || !targetTemp || isOn === undefined) return null;

  const isTempRising = currentTemp <= targetTemp ? '▲' : '... ';
  return (
    <>
     <Grid
      xs={2.5}
      container
      alignItems={'baseline'}
      justifyContent={'flex-end'}
      style={{ textDecoration: isOn ? 'none' : 'line-through' }}
    >
      <Typography className="homey__device homey-right homey-center">{currentTemp.toFixed(1)}°</Typography>
    </Grid>
    <Grid xs={0.5} container justifyContent={'flex-end'} style={{ textDecoration: isOn ? 'none' : 'line-through' }}>
      <Typography className="homey__device homey-right homey-center">{isTempRising}</Typography>
    </Grid>
    <Grid xs={1} container justifyContent={'flex-end'} style={{ textDecoration: isOn ? 'none' : 'line-through' }}>
      <Typography className="homey__device homey-right homey-center">{targetTemp}°</Typography>
    </Grid>
    </>
  );
}

interface HeaterProps {
  currentTemp: number | undefined;
  targetTemp: number | undefined;
  isOn: boolean | undefined;
}
