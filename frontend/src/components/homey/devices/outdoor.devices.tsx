import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { FallbackDisplay } from '../../misc/fallbackDisplay';
import { HomeyCapabilitiesExtended } from '../../../types';

const IconOutdoor = styled('img')({
  width: '40px',
  height: '40px',
  position: 'absolute',
  left: '10px',
  bottom: '10px',
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
      <Grid item xs={6}>
        <Typography
          className="Weather__outdoor-sensor"
          textAlign={'right'}
          paddingRight={'6px'}
        >{`${temperature}${units[0]}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          className="Weather__outdoor-sensor"
          textAlign={'left'}
        >{`${humidity}${units[1]}`}</Typography>
      </Grid>
    </Grid>
  );
}

interface HomeyOutdoorSensorProps {
  data: HomeyCapabilitiesExtended | null;
}
