import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export function ZoneTitle({
  zoneName
}: Readonly<ZoneTitleProps>) {
  return (
    <Grid item xs={3}>
      <Typography className="homey__zone--title homey-left">
        {zoneName}
      </Typography>
    </Grid>
  );
}

interface ZoneTitleProps {
  zoneName: string;
}
