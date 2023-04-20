import { Grid } from '@mui/material';
import SidebarLayout from 'src/layouts/SidebarLayout';


const DefaultPage = () => {


  return (
    <Grid container>


    </Grid>
  )
}

DefaultPage.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default DefaultPage;