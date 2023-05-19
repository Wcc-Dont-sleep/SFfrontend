import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  useTheme,
  styled,
  Avatar,
  Divider,
  alpha,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Slide,
  Container,
  Paper
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'src/components/Text';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';

import Graph from "react-graph-vis";
import { useState } from 'react';
import KnowledgeStatistics from './KnowledgeStatistics';

import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GraphContext } from '@/contexts/GraphKnowledgeContext';
import ReactJson from 'react-json-view';
import Link from 'src/components/Link';


function NodeDetail() {

  return (
    <>
      <GraphContext.Consumer>
        {({ current_node }) => (

          ((current_node != null) && (<Grid
            container
          >

            <Container component={Paper} sx={{
              width: '100%',
              height: 'auto',
              overflow: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: 1,
              borderRadius: 1,
              margin: 3,
              border: (theme) => `solid 1px ${theme.palette.divider}`,
            }}>

              <Grid container spacing={10}>
                <Grid item xs={0.5}>
                  <Button variant="text" fullWidth>
                    ID:
                  </Button>

                </Grid>
                <Grid item xs={2.75}>

                  <Button variant="outlined" fullWidth >
                    {current_node.id}
                  </Button>

                </Grid>


                <Grid item xs={0.5}>

                  <Button variant="text">
                    Name:
                  </Button>

                </Grid>
                <Grid item xs={2.75}>

                  <Button variant="outlined" fullWidth>
                    {current_node.name}
                  </Button>

                </Grid>

                <Grid item xs={2}>

                <Button variant="outlined">
                  <Link
                  onClick={() => {

                    // if(dataset=="adservice"||dataset=="hs_shop")
                    //     window.localStorage.setItem("selected_entity_id","adservice")
                    // else if(dataset=="cartservice")
                    //     window.localStorage.setItem("selected_entity_id","cartservice")
                      console.log(111)
                  }}
                  href='/datadisplay/logging'
                  >         
                  打开日志                       
                    </Link>
                      </Button>
 
                  {/* <GraphContext.Consumer>

                    {({ open_logging }) => (

                      <Button variant="contained"
                        //  onClick={open_logging}
                        fullWidth>
                      <Link
                  onClick={() => {
                    // if(dataset=="adservice"||dataset=="hs_shop")
                    //     window.localStorage.setItem("selected_entity_id","adservice")
                    // else if(dataset=="cartservice")
                    //     window.localStorage.setItem("selected_entity_id","cartservice")
                    //console.log(warningInfo.entity_name)
                  }}
                  href='/datadisplay/logging'
                  >                                
                    </Link>
                    打开日志
                      </Button>

                    )}
                  </GraphContext.Consumer> */}

                </Grid>

                <Grid item xs={2.5}>

                  <GraphContext.Consumer>

                    {({ open_metrics }) => (

                      <Button variant="outlined"
                        // onClick={open_metrics}
                        >
                         <Link
                        onClick={() => {
                         // if(dataset=="adservice"||dataset=="hs_shop")
                        //     window.localStorage.setItem("selected_entity_id","adservice")
                       // else if(dataset=="cartservice")
                        //     window.localStorage.setItem("selected_entity_id","cartservice")
                       //console.log(warningInfo.entity_name)
                       }}
                  href='/datadisplay/metrics'
                  >         
                    打开时间序列                       
                    </Link>
                    {/* 打开时间序列       */}
                      </Button>

                    )}
                  </GraphContext.Consumer>

                </Grid>


              </Grid>


            </Container>

            <Container component={Paper} sx={{
              width: '100%',
              height: 'auto',
              overflow: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: 1,
              borderRadius: 1,
              margin: 3,
              margin_top: 0,
              border: (theme) => `solid 1px ${theme.palette.divider}`,
            }}>

              <Grid container>

                <Grid item xs={12}>

                  <Button variant="text" fullWidth>
                    Property

                  </Button>

                </Grid>

                <Grid item xs={12}>

                  <ReactJson src={JSON.parse(current_node.property)} indentWidth={5} />

                </Grid>

              </Grid>



            </Container>

            <Grid item xs={7} md={3}>

              <Grid container>


                <Grid item xs={12}>
                  <Box height={20}></Box>
                </Grid>
                <Grid item xs={12}>



                  <Grid item xs={12}>
                    <Box height={20}></Box>
                  </Grid>


                  <Grid item xs={12}>
                    <Grid container>



                    </Grid>



                  </Grid>

                </Grid>

              </Grid>

            </Grid>

            <Grid item xs={5} md={2}>

              <Grid container>


                <Grid item xs={12}>
                  <Box height={20}></Box>
                </Grid>




                <Grid item xs={12}>
                  <Box height={20}></Box>
                </Grid>



              </Grid>



            </Grid>

            <Grid item xs={12} md={7}>

              <Grid container>


                <Grid item xs={12}>
                  <Box height={20}></Box>
                </Grid>

                <Grid item xs={12}>



                </Grid>


                <Grid item xs={12}>
                  <Box height={20}></Box>
                </Grid>

          
              </Grid>

            </Grid>

          </Grid>
          ))

        )}
      </GraphContext.Consumer>

    </>
  );
}

export default NodeDetail;
