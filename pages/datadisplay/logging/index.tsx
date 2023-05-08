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
import Link from 'src/components/Link';

function LogPage() {
  const isMountedRef = useRefMounted();
  const [logs, setLogs] = useState<FixedLogs>(null);
  const theme = useTheme();
  const[datatype,setDatatype]=React.useState('normal');
  const [dataset, setDataset] = React.useState('cartservice');
  const [model, setModel] = React.useState('LogAttention');
  const [trigger, setTrigger] = React.useState(false);


  const getLogs = useCallback(async (dataset, model,datatype, start, end) => {
    try {
      const response = await loggingApi.getLogs(dataset, model,datatype, start, end)
      //console.log(datatype)
      console.log(11111);
      console.log(response);

      if (isMountedRef()) {
        setLogs(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);



  useEffect(() => {
    getLogs(dataset, model,datatype, 0, 21474836470);
  }, [getLogs, trigger]);

  const handleDatatypeChange = (event: SelectChangeEvent) => {
    setDatatype(event.target.value);
  };
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
        spacing={6}
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
                  spacing={6}
                >
                  <Grid item xs={2}>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Datatype
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
                        <MenuItem value={"normal"}>Normal</MenuItem>
                        <MenuItem value={"abnormal"}>Abnormal</MenuItem>
                        {/* <MenuItem value={"HDFS"}>HDFS</MenuItem> */}
                      </Select>
                      <FormHelperText>在此处选择数据类型</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
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
                        <MenuItem value={"cartservice"}>运维系统数据集-cartservice</MenuItem>
                        <MenuItem value={"hs_shop"}>运维系统数据集-adservice</MenuItem>
                        {/* <MenuItem value={"HDFS"}>HDFS</MenuItem> */}
                      </Select>
                      <FormHelperText>在此处选择数据集</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
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
                        <MenuItem value={"LogAttention"}>LogAttention</MenuItem>
                        {/* <MenuItem value={"DeepLog"}>DeepLog</MenuItem> */}
                      </Select>
                      <FormHelperText>在此处选择模型</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2} sx={{mt: 1}}>
                    <Button 
                    variant="outlined"
                    disabled={!dataset || !model||!datatype}
                    onClick={(_) => setTrigger(!trigger)}
                    >
                      异常/故障检测
                    </Button>
                  </Grid>
                  <Grid item xs={2} sx={{mt: 1}}>
                  <Button 
                  variant="outlined"
                  // onClick={(_) => setTrigger(!trigger)}
                  disabled={!dataset || !model||!datatype}
                  >                                
                  <Link
                  onClick={() => {
                    window.localStorage.setItem("selected_entity_id",dataset)
                    //console.log(warningInfo.entity_name)
                  }}
                  href='/knowledge/graph'
                  >                                
                    跳转到知识图谱
                    </Link>
                    </Button>
                  </Grid>
                  <Grid item xs={2} sx={{mt: 1}}>
                  <Button 
                  variant="outlined"
                  // onClick={(_) => setTrigger(!trigger)}
                  disabled={!dataset || !model||!datatype}
                  >                                
                  <Link
                  onClick={() => {
                    window.localStorage.setItem("selected_entity_id",dataset)
                    //console.log(warningInfo.entity_name)
                  }}
                  href='/exception/warninginfo'
                  >                                
                    跳转到告警信息
                    </Link>
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
      </Grid>
    </>
  );
}

LogPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default LogPage;
