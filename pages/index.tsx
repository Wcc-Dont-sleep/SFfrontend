import {
  Typography,
  Box,
  Card,
  Container,
  Button,
  styled
} from '@mui/material';
import { ReactElement, useEffect } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Link from 'src/components/Link';
import Head from 'next/head';

import Logo from 'src/components/LogoSign';
import Hero from '@/content/Overview/Hero';
import Highlights from '@/content/Overview/Highlights';
import GlobalConfig from '@/utils/config';

const HeaderWrapper = styled(Card)(
  ({ theme }) => `
  width: 100%;
  display: flex;
  align-items: center;
  height: ${theme.spacing(10)};
  margin-bottom: ${theme.spacing(10)};
`
);

const OverviewWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    background: ${theme.palette.common.white};
    flex: 1;
    overflow-x: hidden;
`
);

function Overview() {

  

  useEffect(()=>{

    console.log(window.location.host);

    GlobalConfig.setFrontendURL(window.location.host)

  })


  return (
    <OverviewWrapper>
      <Head>
        <title>Hispter Shop Knowledge Graph 运维知识图谱</title>
      </Head>
      <HeaderWrapper>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <Logo />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Box />
              <Box>
                <Button
                  component={Link}
                  href="/login"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  登录
                </Button>
                
              </Box>
            </Box>
          </Box>
        </Container>
      </HeaderWrapper>
      <Hero />
      <Highlights />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography textAlign="center" variant="subtitle1">
          {/* Crafted b
          y{' '} */}
          <Link
            href="https://sse.tongji.edu.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            同济大学软件学院
          </Link>
        </Typography>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
