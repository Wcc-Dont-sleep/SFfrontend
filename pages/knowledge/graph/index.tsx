import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageHeader from '@/content/Dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Box, Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const KnowledgeGraph=dynamic(() => import('@/content/Knowledge/Graph/KnowledgeGraph'), { ssr: false });

function DashboardCrypto() {


  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
      </Head>
      <Container maxWidth="lg">
        <Box height={20}></Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>

          
            <KnowledgeGraph/>
            
          </Grid>

        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
