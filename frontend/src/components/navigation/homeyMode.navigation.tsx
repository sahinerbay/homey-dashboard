import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { FallbackDisplay } from '../misc/fallbackDisplay';
import { HomeyModeInfo } from '../../types';

export function HomeyMode({ modes }: Readonly<HomeyModeProps>) {
  if (!modes) return <FallbackDisplay text={'N/A'} />;

  const { Day, Presence, Season, Manual } = modes;

  return (
    <Grid container>
      {Manual ? (
        <Grid xs={12}>
          <Typography className="Info">
            MANUAL MODE ENABLED
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item xs={6}>
            <Typography className="Info Info__name--align-left">
              Mode:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="Info Info__details--align-right">
              {Day}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="Info Info__name--align-left">
              Presence:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="Info Info__details--align-right">
              {Presence}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="Info Info__name--align-left">
              Season:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography className="Info Info__details--align-right">
              {Season}
            </Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}

interface HomeyModeProps {
  modes: HomeyModeInfo | null;
}
