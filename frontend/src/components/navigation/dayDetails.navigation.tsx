import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { FallbackDisplay } from '../misc/fallbackDisplay';
import { DayLength } from '../../types';

export function DayDetails({ dayLength }: DayLengthProps) {
  if (!dayLength) return <FallbackDisplay text={'N/A'} />;

  const { sunrise, sunset, lengthofday } = dayLength;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography className="Info Info__name--align-left">
          Sunrise:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography className="Info Info__details--align-right">
          {sunrise}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography className="Info Info__name--align-left">
          Sunset:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography className="Info Info__details--align-right">
          {sunset}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography className="Info Info__name--align-left">
          Length:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography className="Info Info__details--align-right">
          {lengthofday}
        </Typography>
      </Grid>
    </Grid>
  );
}

interface DayLengthProps {
  dayLength: DayLength | null;
}
