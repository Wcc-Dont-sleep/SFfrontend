import {
  Card,
  Grid,
} from '@mui/material';
import WarningInfoTable from 'src/content/Exceptions/WarningInfo/WarningInfoTable'

function EnergySurplusUI() {

  const warningInfos = []

  return (
    <Card>
      <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12}>
          <WarningInfoTable warningInfos={warningInfos} />
        </Grid>
      </Grid>
    </Card>
  );
}

export default EnergySurplusUI;
