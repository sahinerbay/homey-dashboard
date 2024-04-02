import Grid from '@mui/material/Grid';
import { HomeyMode } from './homeyMode.navigation';
import { HomeyPresence } from './homeyPresence.navigation';
import { HomeyModeInfo, HomeyUserPresence } from '../../types';
import { BorderStyle } from './../../tokens';

export default function HeaderNav({
  modes,
  userPresence,
}: HeaderNavProps) {
  return (
    // #Header used when Puppeteer takes screenshot
    <Grid container m={0} columns={15} id="Header">
      <Grid
        item
        xs={7.5}
        border={BorderStyle}
        className="info__wrapper__center"
      >
        <HomeyPresence userPresence={userPresence} />
      </Grid>
      <Grid
        item
        xs={7.5}
        border={BorderStyle}
        className="info__wrapper__center"
      >
        <HomeyMode modes={modes} />
      </Grid>
    </Grid>
  );
}

interface HeaderNavProps {
  modes: HomeyModeInfo | null;
  userPresence: HomeyUserPresence[] | null;
}

