import { FC } from 'react';
import {
  Card,
  Container,
  Grid
} from '@mui/material';
import ChartTranslucent from 'src/content/DataDisplay/ChartTranslucent';


const PromotionBody: FC = () => {
  return (
    <Container maxWidth="lg">
      <Card
        sx={{
          p: 3,
          mb: 3
        }}
      >
        <Grid item lg={12} xs={12}>
        <ChartTranslucent
            labels={['label', 'label', 'label', 'label', 'label']}
            metricData={[1, 4, 3, 4, 6]}
            scoreData={[2, 3, 2, 5, 3]}
            />
        </Grid>
      </Card>
    </Container>
  );
};

export default PromotionBody;
