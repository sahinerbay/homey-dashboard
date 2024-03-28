import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { FallbackDisplay } from '../misc/fallbackDisplay';
import { HomeyUserPresence } from '../../types';

export function HomeyPresence({
  userPresence,
}: Readonly<HomeyPresenceProps>) {
  if (!userPresence) return <FallbackDisplay text={'N/A'} />;

  return (
    <Grid container>
      {userPresence.map((user) => {
        return (
          <>
            <Grid item xs={6}>
              <Typography className="Info Info__name--align-left">
                {user.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className="Info Info__details--align-right">
                {user.isHome ? 'Home' : 'Away'}
              </Typography>
            </Grid>
          </>
        );
      })}
    </Grid>
  );
}

interface HomeyPresenceProps {
  userPresence: HomeyUserPresence[] | null;
}
