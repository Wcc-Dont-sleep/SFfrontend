import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Head from 'next/head';
import PageHeader from '@/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Typography, useTheme, Box, alpha, Card, Button } from '@mui/material';
import NotificationImportantTwoToneIcon from '@mui/icons-material/NotificationImportantTwoTone';
import ChartTranslucent from 'src/content/DataDisplay/ChartTranslucent';
// import SparklineBar from '@/content/DataDisplay/SparklineBar';
import { useState, useEffect, useCallback } from 'react';
import { useRefMounted } from 'src/hooks/useRefMounted';
import { timeSeriesApi } from 'src/apis/TimeSeriesApi';
import type { TimeSeriesDisplay } from 'src/models/timeseries';
import Link from 'src/components/Link';

function MetricsPage() {
  const isMountedRef = useRefMounted();
  const theme = useTheme();
  const [datatype, setDatatype] = useState('Normal');
  const [dataset, setDataset] = useState('运维系统2');
  const [model, setModel] = useState('CNN');
  const [displayValue, setDisplayValue] = useState<TimeSeriesDisplay>(null);
  const [trigger, setTrigger] = useState<boolean>(false);

  const handleDatatypeChange = (event: SelectChangeEvent) => {
    setDatatype(event.target.value);
  };
  const handleDatasetChange = (event: SelectChangeEvent) => {
    setDataset(event.target.value);
  };
  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value);
  };

  const getMetrics = useCallback(async (dataset, model,datatype, start, end) => {
    try {
      const response = await timeSeriesApi.getTimeSeries(dataset, model,datatype, start, end);

      if (isMountedRef()) {
        // setWarningInfos(response);
        setDisplayValue(response);

        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getMetrics(dataset, model,datatype, 1672409895, 1672699695);
  }, [getMetrics, trigger]);

  if (displayValue === null) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Metrics - DataDisplay</title>
      </Head>
      <PageTitleWrapper>
        {PageHeader('Metrics', 'Metrics 时间序列和异常分数')}
      </PageTitleWrapper>
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
              background: alpha(theme.colors.info.main, 0.08),
              display: 'flex',
              alignItems: 'flex-start',
              p: 2
            }}
          >
            <NotificationImportantTwoToneIcon
              sx={{
                mr: 1,
                color: theme.colors.info.main,
                fontSize: theme.typography.pxToRem(22)
              }}
            />
            <Box>
              <Typography
                variant="h4"
                sx={{
                  pt: 0.2
                }}
                gutterBottom
              >
                选择数据集和模型
              </Typography>
                <Grid
                  sx={{
                    px: 3
                  }}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                  spacing={5}
                >
                  <Grid item xs={3}>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        DataType
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={datatype}
                        label="Age"
                        onChange={handleDatatypeChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Normal"}>Normal</MenuItem>
                        <MenuItem value={"Abnormal"}>Abnormal</MenuItem>
                      </Select>
                      <FormHelperText>在此处选择数据类型</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Dataset
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={dataset}
                        label="Age"
                        onChange={handleDatasetChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"adservice"}>运维系统数据集-adservice</MenuItem>
                        <MenuItem value={"cartservice"}>运维系统数据集-cartservice</MenuItem>
                        {/* <MenuItem value={"AIOps"}>运维系统2</MenuItem> */}
                      </Select>
                      <FormHelperText>在此处选择数据集</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Model
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={model}
                        label="Age"
                        onChange={handleModelChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"SAT-CNN"}>SAT-CNN</MenuItem>
                        {/* <MenuItem value={"Transformer"}>Transformer</MenuItem> */}
                        {/* <MenuItem value={"CNN"}>LogAttention</MenuItem> */}
                      </Select>
                      <FormHelperText>在此处选择模型</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} sx={{mt: 1}}>
                  <Button 
                  variant="outlined"
                  onClick={(_) => setTrigger(!trigger)}
                  disabled={!dataset || !model}
                  >
                    异常检测
                    </Button>

                    {/* 异常分数： */}
                    {/* {"   "+displayValue.series[0].score+'\n'} */}
                  </Grid>
                  <Grid item xs={3} sx={{mt: 1}}>
                  <Button 
                  variant="outlined"
                  // onClick={(_) => setTrigger(!trigger)}
                  disabled={!dataset || !model}
                  >                                
                  <Link
                  onClick={() => {
                    window.localStorage.setItem("selected_entity_id","grafana")
                    //console.log(warningInfo.entity_name)
                  }}
                  href='/knowledge/graph'
                  >                                
                    跳转到知识图谱
                    </Link>
                    </Button>
                  </Grid>
                </Grid>
            </Box>
          </Card>
        </Grid>
        <Grid item lg={12} xs={12}>
        <ChartTranslucent
            labels={displayValue.series.map((v) => v.time.toString())}
            metricData={displayValue.series.map((v) => v.value)}
            scoreData={displayValue.series.map((v) => v.score)}
            />
        </Grid>
        <Grid item lg={12} xs={12}>
          {/* <SparklineBar /> */}
        </Grid>
      </Grid>
    </>
  );
}

MetricsPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default MetricsPage;