import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { ForecastByDayData } from '../../types';
import { FMI_IMAGE_URL } from '../../config';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '100px',
  height: '100px',
  marginTop: '-16px',
});

export function ForecastByDay({
  data: forecastByDay,
}: ForecastByDayProps) {
  return (
    <>
      {Object.entries(forecastByDay).map((item, index) => {
        const [day, forecast] = item;
        return (
          <Grid item xs={3} key={index}>
            <Typography className="Weather--bold Weather__day__title">
              {day}
            </Typography>
            <Grid container item xs key={index}>
              {forecast.map((item, index) => {
                const { flike, symb, temp } = item;
                return (
                  <Grid item xs={6} key={index}>
                    <Img src={`${FMI_IMAGE_URL}/${symb}.svg`} />
                    <Typography className="Weather--bold Weather__day__temp">
                      {Math.round(temp)}°
                      <Typography
                        className="Weather--bold Weather__day__divider"
                        component="span"
                      >
                        |
                      </Typography>
                      <Typography
                        className="Weather--bold Weather__day__flike"
                        component="span"
                      >
                        {Math.round(flike)}°
                      </Typography>
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}

interface ForecastByDayProps {
  data: ForecastByDayData;
}
