import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { ForecastByHourItem } from '../../types';

export function Precipitation({
  data: forecastByHour,
}: Readonly<PrecipitationProps>) {
  return (
    <>
      {forecastByHour.map((hour, index) => (
        <Grid item xs={3} key={index} mt={2}>
          <Typography className="Weather--bold Weather__hour__pop">
            {hour.pop}% {hour.precipitation}mm
          </Typography>
        </Grid>
      ))}
    </>
  );
}
interface PrecipitationProps {
  data: ForecastByHourItem[];
}
