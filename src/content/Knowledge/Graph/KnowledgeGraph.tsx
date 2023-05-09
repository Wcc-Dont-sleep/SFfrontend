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
  Container,
  Paper
} from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Text from 'src/components/Text';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';

import GraphVis from "react-graph-vis";
import { useState } from 'react';
import KnowledgeStatistics from './KnowledgeStatistics';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { GraphContext } from '@/contexts/GraphKnowledgeContext';
import NodeDetail from './NodeDetail';
import NodeLogging from './NodeLogging';
import NodeMetrics from './NodeMetrics';

import type { LogNode } from '@/models/log';
import type { TimeSeriesNode } from '@/models/timeseries';
import type { Graph, Node, Edge } from '@/models/graph'

import { useEffect, useCallback } from 'react';
import { useRefMounted } from 'src/hooks/useRefMounted';

import { graphApi } from 'src/apis/GraphApi';
import { StartDatePickContext } from '@/contexts/StartDatePickContext';
import { EndDatePickContext } from '@/contexts/EndDatePickContext';

import { addDays } from 'date-fns';
import dynamic from 'next/dynamic';

import dayjs, { Dayjs } from 'dayjs';
import { Label } from '@mui/icons-material';


const StartBasicDatePicker = () => {



  const [value, setValue] = useState<Dayjs | null>(dayjs.unix(Date.now() / 1000).subtract(1, 'minute'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StartDatePickContext.Consumer>
        {({ startDate, setStartDate, request }) => (

          <DatePicker
            label="请点击日历表选择日期"
            value={value}
            onChange={(newValue) => {

              setStartDate(newValue?.toDate() as Date);
              setValue(newValue);

              console.log("start day:", newValue?.toDate());

              request();
            }}
            renderInput={(params) => <TextField {...params} />}
          />)}

      </StartDatePickContext.Consumer>

    </LocalizationProvider>
  );
}



const EndBasicDatePicker = () => {


  const [value, setValue] = useState<Dayjs | null>(dayjs.unix(Date.now() / 1000));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <EndDatePickContext.Consumer>
        {({ endDate, setEndDate, request }) => (

          <DatePicker
            label="请点击日历表选择日期"
            value={value}
            onChange={(newValue) => {

              setEndDate(newValue?.toDate() as Date);
              setValue(newValue);

              console.log("end day:", newValue?.toDate());

              request();
            }}
            renderInput={(params) => <TextField {...params} />}
          />)}

      </EndDatePickContext.Consumer>

    </LocalizationProvider>
  );
}


const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    length: 1000
  },
  nodes: {
    color: {
      highlight: {
        border: "#f8806f"
      }
    },
    borderWidth: 3,
    borderWidthSelected: 20,
    imagePadding: {
      left: 0,
      top: 0,
      bottom: 0,
      right: 0
    },
  }
};

const get_red = (node: Node)=>{
  let mystored=window.localStorage.getItem('selected_entity_id')
  if (mystored=="hs_shop"){
    mystored="hipster shop"
  }
  if (node.id==mystored)
  {
    return 'selected'
  }
  else{
    return ' ' //+'\n'+node.label + '\n' + node.name
  }
}

const get_node_image = (label: string) => {

  const Selected = [
    '/static/images/icons/selected.jpg',
  ]
  const RedContainer =[
    '/static/images/icons/container0red.jpg',
  ]
  const RedService=[
    '/static/images/icons/service0red.jpg',
  ]
  const Containers = [
    '/static/images/icons/Container0.png',
  ];

  const Environments = [
    '/static/images/icons/Environment0.png'
  ];

  const Namespaces = [
    '/static/images/icons/Namespace0.png'
  ];

  const Pods = [
    '/static/images/icons/Pod0.png',
    '/static/images/icons/Pod1.png',
    '/static/images/icons/Pod2.png'
  ];

  const Services = [
    '/static/images/icons/Service0.png',
    '/static/images/icons/Service1.png'
  ];

  const Servers = [
    '/static/images/icons/Server0.png',
    '/static/images/icons/Server3.png'
  ]


  if (label.includes('Server') || label.includes('server')) {
    return Servers[Math.floor(Math.random() * (Servers.length - 1))];
  }

  if (label.includes('Container') || label.includes('container') || label.includes('Deployment') || label.includes('deployment')) {
    if (label.includes('selected')||label.includes('Selected')){
      return RedContainer[Math.floor(Math.random() * (RedContainer.length - 1))]
    }
    return Containers[Math.floor(Math.random() * (Containers.length - 1))];
  }

  if (label.includes('Environment') || label.includes('environment')) {
    return Environments[Math.floor(Math.random() * (Environments.length - 1))];
  }

  if (label.includes('Namespace') || label.includes('namespace')) {
    return Namespaces[Math.floor(Math.random() * (Namespaces.length - 1))];
  }

  if (label.includes('Service') || label.includes('service') || label.includes('Node') || label.includes('node')) {
    if (label.includes('selected')||label.includes('Selected')){
      return RedService[Math.floor(Math.random() * (RedService.length - 1))]
    }
    return Services[Math.floor(Math.random() * (Services.length - 1))];
  }


  return Pods[Math.floor(Math.random() * (Pods.length - 1))];
};


function AccountBalance() {


  const [graphModel, setGraphModel] = useState<Graph>({ nodes: [], edges: [] });

  const isMountedRef = useRefMounted();

  const [current_node, setSelectedNode] = useState<Node>(null);

  const [logging_open, setLoggingOpen] = useState<Boolean>(false);

  const [metrics_open, setMetricsOpen] = useState<Boolean>(false);

  const [startDate, setStartDate] = useState<Date>(addDays(new Date(), -1));

  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 0));

  const [selectInitial,setSelectInitial] = useState<(network:any)=>void>((old)=>(network)=>{
    return;
  }

  );

  const unselect = () => {
    setSelectedNode(null);
  }

  const open_logging = () => {
    setLoggingOpen(true)
  }

  const close_logging = () => {
    setLoggingOpen(false)
  }

  const open_metrics = () => {
    setMetricsOpen(true)
  }

  const close_metrics = () => {
    setMetricsOpen(false)
  }

  const createNode = (x, y) => {
    
    setGraphModel((graphModel) => {

      let newNode={
        id: "newNode"+(graphModel.nodes.length+10).toString(),
        label:"Namespace",
        name: "New Node",
        namespace:"",
        pod_node:"",
        property: "{}"
      } as Node;

      localStorage.setItem('selected_entity_id', newNode.id);

      setSelectedNode(newNode);

      return {
          nodes: [
            ...graphModel.nodes,
            newNode
          ],
          edges: graphModel.edges
        }
    });
  }


  const request = useCallback(async () => {
    try {
      let origin: Graph = await graphApi.getGraph(startDate.getTime(), endDate.getTime());

      if (isMountedRef()) {

        var response: Graph = { nodes: [], edges: [] };

        let stored = window.localStorage.getItem('selected_entity_id')
        //let tored=window.localStorage.getItem('')
        if (stored=="hs_shop"){
          stored="hipster shop"
        }
        if (stored) {
          let node = origin.nodes.find((o => o.id === stored));

          if (node) {
            
            response.nodes.push(node);

          }
        }

        for (let node of origin.nodes) {
          if (response.nodes.find((o => o.id === node.id))) {
            continue;
          }

          if (response.nodes.length > 30) {
            break;
          }
          response.nodes.push(node);
        }


        for (let edge of origin.edges) {
          if (response.nodes.find((o => o.id === edge.from_id)) && response.nodes.find((o => o.id === edge.to_id))) {
            response.edges.push(edge);
          }
        }

        setGraphModel({
          nodes: response.nodes,
          edges: response.edges
        });

        if (stored) {
          console.log("stored", stored);
          console.log(graphModel.nodes)
          let node = graphModel.nodes.find((o => o.id === stored));
  
          if (node) {

            setSelectedNode(node);
  
          }
        }

      }
    } catch (err) {
      console.error(err);
    }
  }, [startDate,endDate]);



  useEffect(() => {
    request();
  }, [request]);



  const graphShow = {
    graph: {
      nodes: graphModel.nodes.map((node) => {
        return {
          id: node.id,
          label: node.label + '\n' + node.name,
          image: get_node_image(node.label+get_red(node)),
          shape: 'circularImage',
        }
      }),
      edges: graphModel.edges.map((edge) => {
        return {
          from: edge.from_id,
          to: edge.to_id,
          label: edge.value
        }
      })
    },
    events: {
      select: ({ nodes, edges }) => {

        console.log("selectednodes", nodes);
        console.log("shownodes", graphShow.graph.nodes);
        console.log("modelnodes", graphModel.nodes);

        let node = graphModel.nodes.find((o => o.id === nodes[0]))

        setSelectedNode(node);

      },
      doubleClick: ({ pointer: { canvas } }) => {
        createNode(canvas.x, canvas.y);

      },
      deselectNode: () => {
        localStorage.removeItem('selected_entity_id');
      }
    }
  }

  return (
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={9}>
          <Box p={4}>

            <Box>
              <Typography variant="h1" gutterBottom>
                运维对象（系统）虚拟重构（知识图谱）：
              </Typography>
              <Box height={30}> </Box>
              <Typography
                variant="h2"
                fontWeight="normal"
                color="text.secondary"
              >
                通过知识图谱再现：
              </Typography>
            </Box>
          </Box>

        </Grid>
        <Grid item xs={3}>
          <Box p={4} paddingTop={13}>

          <Button variant='outlined' fullWidth>
            <Typography variant="h4">
              双击空白处添加运维节点
            </Typography>
          </Button>

          </Box>
          
          
        </Grid>
        <GraphContext.Provider value={{ current_node, logging_open, metrics_open, unselect, close_logging, close_metrics, open_logging, open_metrics }}>
          <Grid item xs={12} md={12}>
            <Box>
              <Box>
                <Box
                  display="flex"
                  alignItems="center"
                >
                  <Container component={Paper} sx={{
                    padding: 0,
                    margin: 5,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    position: 'relative',
                    borderRadius: 5,
                    border: 0,
                    boxShadow: 0,

                  }}>

                    <GraphVis width={"100%"} 
                    key={graphShow.graph.nodes.length}
                    graph={graphShow.graph} 
                    options={options} 
                    events={graphShow.events} 
                    style={{ height: "600px" }} 
                    getNetwork={(network)=>{

                      if(current_node){
                        network.selectNodes([current_node.id]);
                      }
                    }}/>

                  </Container>

                </Box>
              </Box>

              <Container component={Paper}
              sx={{
                padding: 2,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                position: 'relative',
                border: 0,
              }}>

                {/* <Grid container spacing={3}> */}
                  {/* <Grid xs={1.5} item
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Button variant="text" fullWidth style={{fontSize:'1.25rem'}}>
                      开始日期
                    </Button>

                  </Grid>
                  <Grid xs={3.5} item
                    display="flex"
                    justifyContent="center"
                    alignItems="center">

                    <StartDatePickContext.Provider value={{ startDate, setStartDate, request }}>

                      <StartBasicDatePicker />

                    </StartDatePickContext.Provider>



                  </Grid>
                  <Grid xs={2} item
                    display="flex"
                    justifyContent="center"
                    alignItems="center">

                  </Grid>
                  <Grid xs={1.5} item
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Button variant="text" fullWidth style={{fontSize:'1.25rem'}}>
                      结束日期
                    </Button>

                  </Grid>
                  <Grid xs={3.5} item
                    display="flex"
                    justifyContent="center"
                    alignItems="center">

                    <EndDatePickContext.Provider value={{ endDate, setEndDate, request }} >

                      <EndBasicDatePicker />

                    </EndDatePickContext.Provider>


                  </Grid> */}
                {/* </Grid> */}


              </Container>



            </Box>
          </Grid>

          <NodeLogging />
          <NodeMetrics />
          <NodeDetail />


        </GraphContext.Provider>
      </Grid>
    </Card>
  );
}

export default AccountBalance;
