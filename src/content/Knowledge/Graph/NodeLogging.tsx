
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Head from 'next/head';
import PageHeader from '@/components/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Typography, useTheme, Box, alpha, Card, Button, Input, TextField } from '@mui/material';
import NotificationImportantTwoToneIcon from '@mui/icons-material/NotificationImportantTwoTone';
import ChartFilled from 'src/content/DataDisplay/ChartFilled';
import ChartOutlined from '@/content/DataDisplay/ChartOutlined';



import { GraphContext } from '@/contexts/GraphKnowledgeContext';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { loggingApi } from '@/apis/LoggingApi';
import LogTable from '@/content/DataDisplay/LogTable/LogTable';
import { useRefMounted } from '@/hooks/useRefMounted';
import { FixedLogs, Logging } from '@/models/fixed_log';
import React, { useState, useCallback, forwardRef, ReactElement, Ref, useEffect } from 'react';

import {graphApi} from '@/apis/GraphApi';

import {LogNode} from '@/models/log';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function Detail({current_node,logging_open,close_logging}){


  const isMountedRef = useRefMounted();
  const [logs, setLogs] = useState<LogNode[]>(null);
  const theme = useTheme();
  const [dataset, setDataset] = React.useState('HDFS');
  const [model, setModel] = React.useState('DeepLog');
  const [trigger, setTrigger] = React.useState(false);


  const getLogs = useCallback(async (dataset, model, start, end) => {
    try {
      const response = await graphApi.getNodeLog(start,end,current_node.id)

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
    <Dialog
    fullScreen
    open={logging_open.valueOf()}
    onClose={close_logging}
    TransitionComponent={Transition}
  >
    <AppBar sx={{ position: 'relative' }}>
      <Toolbar>
        <Box width={20}></Box>
        <IconButton
          
          edge="start"
          color="inherit"
          onClick={close_logging}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          日志
        </Typography>
        <Button autoFocus color="inherit" onClick={close_logging}>
          退出
        </Button>
      </Toolbar>
    </AppBar>

    <Box height={50}></Box>
    

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
              <Grid item xs={4}>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  {/* <InputLabel id="demo-simple-select-helper-label">
                    Dataset
                  </InputLabel> */}
                  <TextField
                    //labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={current_node.id}
                    label="Dataset"
                    //onChange={handleDatasetChange}
                  >
                  </TextField>
                  <FormHelperText>选中节点</FormHelperText>
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
                    <MenuItem value={"LogAnomaly"}>LogAnomaly</MenuItem>
                    <MenuItem value={"DeepLog"}>DeepLog</MenuItem>
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
          logs ? (
            <LogTable 
          logs={logs.map((log) => ({
            content: log.content,
            score:   NaN,
            time:    log.time,
          } as Logging))}
          threshold={1}
          probability={NaN}
        />
          ) : null
        }
    </Grid>
    <Grid item lg={12} xs={12}>
    </Grid>
  </Grid>


  </Dialog>);


}


function  DefaultPage()  {

  return (
    <>
    <GraphContext.Consumer>

        {({current_node,logging_open,close_logging}) => (
        
        (current_node&&<Detail key={current_node.id+"log"} current_node={current_node} logging_open={logging_open} close_logging={close_logging}/>)

      )}
    </GraphContext.Consumer>
      
    </>
  );
}


export default DefaultPage;

