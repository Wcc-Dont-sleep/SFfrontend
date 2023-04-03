import { useState, useEffect, useCallback } from 'react';

import SidebarLayout from 'src/layouts/SidebarLayout';

import Head from 'next/head';
// import PageHeader from 'src/content/Exceptions/WarningInfo/PageHeader';
import PageHeader from '@/components/PageHeader';
import Footer from 'src/components/Footer';
// import Statistics from 'src/content/Management/WarningInfos/Statistics';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import type { WarningInfo } from '@/models/warning_info';

import { Grid } from '@mui/material';
import { useRefMounted } from 'src/hooks/useRefMounted';
import WarningInfoTable from 'src/content/Exceptions/WarningInfo/WarningInfoTable';
import { warningInfoApi } from '@/apis/WarningInfoApi';

function WarningInformationPage() {
  const isMountedRef = useRefMounted();
  const [warningInfos, setWarningInfos] = useState<WarningInfo[]>([]);

  const getWarningInfos = useCallback(async () => {
    try {
      const response = await warningInfoApi.getWarnings(0, 2147483647000);

      if (isMountedRef()) {
        setWarningInfos(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getWarningInfos();
  }, [getWarningInfos]);

  return (
    <>
      <Head>
        <title>Warnings</title>
      </Head>
      <PageTitleWrapper>
        {PageHeader("告警信息", "系统的所有异常告警信息")}
      </PageTitleWrapper>

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
      <Footer />
    </>
  );
}

WarningInformationPage.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);

export default WarningInformationPage;
