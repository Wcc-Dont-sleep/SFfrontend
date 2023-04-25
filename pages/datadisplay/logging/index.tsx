import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useRefMounted } from 'src/hooks/useRefMounted';
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
import LogTable from '@/content/DataDisplay/LogTable/LogTable';
import { loggingApi } from '@/apis/LoggingApi';
import { FixedLogs } from 'src/models/fixed_log';

function LogPage() {
  const isMountedRef = useRefMounted();
  const [logs, setLogs] = useState<FixedLogs>(null);
  const theme = useTheme();
  const [dataset, setDataset] = React.useState('HDFS');
  const [model, setModel] = React.useState('DeepLog');
  const [trigger, setTrigger] = React.useState(false);


  const getLogs = useCallback(async (dataset, model, start, end) => {
    try {
      const response = await loggingApi.getLogs(dataset, model, start, end)

      console.log(response);

      if (isMountedRef()) {
        setLogs(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getLogs(dataset, model, 1672409895, 1672411695);
  }, [getLogs, trigger]);


  const handleDatasetChange = (event: SelectChangeEvent) => {
    setDataset(event.target.value);
  };
  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Logging - DataDisplay</title>
      </Head>
      <PageTitleWrapper>
        {PageHeader('Logging', 'Logging 时间序列和异常分数')}
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
                    px: 4
                  }}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                  spacing={10}
                >
                  <Grid item xs={3}>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Datatype
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
                        <MenuItem value={"Normal"}>Normal</MenuItem>
                        <MenuItem value={"Abnormal"}>Abnormal</MenuItem>
                        {/* <MenuItem value={"HDFS"}>HDFS</MenuItem> */}
                      </Select>
                      <FormHelperText>在此处选择数据类型</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
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
                        <MenuItem value={"BGL-cartservice"}>BGL-cartservice</MenuItem>
                        <MenuItem value={"BGL-hs_shop"}>BGL-hs_shop</MenuItem>
                        {/* <MenuItem value={"HDFS"}>HDFS</MenuItem> */}
                      </Select>
                      <FormHelperText>在此处选择数据集</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
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
                        <MenuItem value={"LogAnomaly"}>LogAttention</MenuItem>
                        {/* <MenuItem value={"DeepLog"}>DeepLog</MenuItem> */}
                      </Select>
                      <FormHelperText>在此处选择模型</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sx={{mt: 1}}>
                    <Button 
                    variant="outlined"
                    disabled={!dataset || !model}
                    onClick={(_) => setTrigger(!trigger)}
                    >
                      异常检测
                    </Button>
                  </Grid>
                </Grid>
            </Box>
          </Card>
        </Grid>
        <Grid item lg={12} xs={12}>
            {
              logs && logs.logging ? (
                <LogTable 
            logs={logs.logging}
            threshold={logs.threshold}
            probability={logs.probability}
            />
              ) : null
            }
        </Grid>
        <Grid item lg={12} xs={12}>
        </Grid>
      </Grid>
    </>
  );
}

LogPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default LogPage;
