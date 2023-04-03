import { useTranslation } from 'react-i18next';
import {
  Grid,
  Typography,
} from '@mui/material';

function PageHeader(title: string, desc: string) {
  const { t }: { t: any } = useTranslation();
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {t(title)}
          </Typography>
          <Typography variant="subtitle2">
            {t(desc)}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PageHeader;
