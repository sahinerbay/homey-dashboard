import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { HomeyOutdoorSensor } from '../homey/devices/outdoor.devices';
import {
  CurrentForecastItem,
  HomeyCapabilitiesExtended,
} from '../../types';
import { currentDay } from './utils.weather';
import { FORECA_IMAGE_URL } from './../../config';

const Img = styled('img')({
  margin: '20px auto',
  display: 'block',
  width: '250px',
  height: '300px',
});

export function CurrentWeather({
  data: currentWeather,
  outdoorSensor,
}: CurrentWeatherProps) {
  const { flike, symb, temp } = currentWeather;

  const currentDate = new Date();
  const today = currentDay(currentDate);

  return (
    <Grid item>
      <Typography className="Weather--bold Weather__current__date">
        {today}
      </Typography>
      <Img src={`${FORECA_IMAGE_URL}/${symb}.png`} />
      <Typography className="Weather--bold Weather__current__temp">
        {temp}°
        <Typography
          className="Weather--bold Weather__current__divider"
          component="span"
        >
          |
        </Typography>
        <Typography
          className="Weather--bold Weather__current__flike"
          component="span"
        >
          {flike}°
        </Typography>
      </Typography>
      <HomeyOutdoorSensor data={outdoorSensor} />
    </Grid>
  );
}

interface CurrentWeatherProps {
  data: CurrentForecastItem;
  outdoorSensor: HomeyCapabilitiesExtended | null;
}
