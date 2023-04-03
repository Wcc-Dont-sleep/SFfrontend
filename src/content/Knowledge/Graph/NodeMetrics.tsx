
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid, Typography, useTheme, Box, alpha, Card, Button, TextField } from '@mui/material';
import NotificationImportantTwoToneIcon from '@mui/icons-material/NotificationImportantTwoTone';

import { useState, useEffect, useCallback,forwardRef } from 'react';
import { useRefMounted } from 'src/hooks/useRefMounted';
import { timeSeriesApi } from 'src/apis/TimeSeriesApi';
import type { TimeSeriesDisplay } from 'src/models/timeseries';


import { GraphContext } from '@/contexts/GraphKnowledgeContext';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ChartTranslucent from '@/content/DataDisplay/ChartTranslucent';

import { TimeSeriesNode } from 'src/models/timeseries';
import { graphApi } from '@/apis/GraphApi';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function Detail({current_node,metrics_open,close_metrics}){

  const isMountedRef = useRefMounted();
  const theme = useTheme();
  const [dataset, setDataset] = useState('AIOps');
  const [model, setModel] = useState('CNN');
  const [displayValue, setDisplayValue] = useState<TimeSeriesNode[]>(null);
  const [trigger, setTrigger] = useState<boolean>(false);

  const handleDatasetChange = (event: SelectChangeEvent) => {
    setDataset(event.target.value);
  };
  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value);
  };

  const getMetrics = useCallback(async (dataset, model, start, end) => {
    try {
      const response = await graphApi.getNodeTimeSeries(start, end,current_node.id);

      if (isMountedRef()) {
        // setWarningInfos(response);
        setDisplayValue(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getMetrics(dataset, model, 1672409895, 1672699695);
  }, [getMetrics, trigger]);

  if (displayValue === null) {
    return null;
  }




  return (
    <Dialog
        fullScreen
        open={metrics_open.valueOf()}
        onClose={close_metrics}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
          <Box width={20}></Box>
            <IconButton
              edge="start"
              color="inherit"
              onClick={close_metrics}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              时间序列
            </Typography>
            <Button autoFocus color="inherit" onClick={close_metrics}>
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
                        <MenuItem value={"LSTM"}>LSTM</MenuItem>
                        <MenuItem value={"Transformer"}>Transformer</MenuItem>
                        <MenuItem value={"CNN"}>CNN</MenuItem>
                      </Select>
                      <FormHelperText>在此处选择模型</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} sx={{mt: 1}}>
                  <Button 
                  variant="outlined"
                  onClick={(_) => setTrigger(!trigger)}
                  disabled={!dataset || !model}
                  >
                    异常检测
                    </Button>
                  </Grid>
                </Grid>
            </Box>
          </Card>
        </Grid>
        <Grid item lg={12} xs={12}>
        <ChartTranslucent
            labels={displayValue.map((v) => v.time.toString())}
            metricData={displayValue.map((v) => v.value)}
            scoreData={displayValue.map((v) => NaN)}
            />
        </Grid>
        <Grid item lg={12} xs={12}>
          {/* <SparklineBar /> */}
        </Grid>
      </Grid>



      </Dialog>

  )
}


function  DefaultPage() {


  return (
    <>
    <GraphContext.Consumer>

        {({current_node,metrics_open,close_metrics}) => (
        
        ((current_node&&<Detail key={current_node.id+"metrics"} current_node={current_node} metrics_open={metrics_open} close_metrics={close_metrics}/>
        ))

      )}
    </GraphContext.Consumer>
      
    </>
  );
}

export default DefaultPage;

