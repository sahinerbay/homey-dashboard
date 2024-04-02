import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { FallbackDisplay } from '../../misc/fallbackDisplay';
import { HomeyCapabilitiesExtended } from '../../../types';

const IconOutdoor = styled('img')({
  width: '40px',
  height: '40px',
  position: 'absolute',
  left: '24px',
  bottom: '11px',
});

export function HomeyOutdoorSensor({
  data,
}: HomeyOutdoorSensorProps) {
  if (!data) return <FallbackDisplay text={'N/A'} />;

  const units = ['°', '%'];
  const [temperature, humidity] = data.values;
  return (
    <Grid
      container
      style={{ position: 'relative', marginTop: '-12px' }}
    >
      <IconOutdoor src="/icon/outdoor.png" />
      <Grid item xs={12}>
        <Typography
          className="Weather__outdoor-sensor"
        >{`${Math.round(temperature as number)}${units[0]}`} {`${humidity}${units[1]}`}</Typography>
      </Grid>
    </Grid>
  );
}

interface HomeyOutdoorSensorProps {
  data: HomeyCapabilitiesExtended | null;
}
