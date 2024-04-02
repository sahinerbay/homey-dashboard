import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export function SensorHumidAndTemp({
  humid,
  temp
}: Readonly<SensorHumidProps>) {

    return (
      <>
        <Grid xs={1.5} container>
          <Typography className="homey__device homey-center">
            {humid && `${humid}%`}
          </Typography>
        </Grid>
        <Grid xs={1.5} container>
          <Typography className="homey__device home-center">
            {temp && `${temp.toFixed(1)}°`}
          </Typography>
        </Grid>
      </>
    );
}

interface SensorHumidProps {
  humid: number | undefined;
  temp: number | undefined;
}
