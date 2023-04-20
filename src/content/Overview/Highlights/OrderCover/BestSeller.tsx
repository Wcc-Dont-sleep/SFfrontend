import { Card, Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText, Button } from '@mui/material';
import LogTable from '@/content/DataDisplay/LogTable/LogTable';
import { Logging } from '@/models/fixed_log';

function BestSeller() {

  const logs: Logging[] =  [
    {
      content: 'content1',
      score: 97,
      time: 128461892372
    },
    {
      content: 'content1',
      score: 97,
      time: 128461892372
    },
    {
      content: 'content1',
      score: 97,
      time: 128461892372
    },
    {
      content: 'content1',
      score: 97,
      time: 128461892372
    },
    {
      content: 'content1',
      score: 97,
      time: 128461892372
    }
  ]

  return (
    <Card
    sx={{ minWidth: 800}}
    >
      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              p: 2
            }}
          >
          </Card>
        </Grid>
        <Grid item lg={12} xs={12}>
            {
              (
                <LogTable 
            logs={logs}
            threshold={95}
            probability={1}
            />
              )
            }
        </Grid>
        <Grid item lg={12} xs={12}>
        </Grid>
      </Grid>
    </Card>
  );
}

export default BestSeller;
