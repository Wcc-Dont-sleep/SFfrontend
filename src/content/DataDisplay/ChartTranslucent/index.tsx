import { ChangeEvent, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Button,
  Tabs,
  Tab,
  Avatar,
  Box,
  styled,
  useTheme
} from '@mui/material';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';


function Activity({labels,metricData,scoreData}:{labels: string[], metricData: number[] ,scoreData: number[]}) {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    stroke: {
      curve: 'smooth',
      width: [3, 3],
      dashArray: [0, 5],
      colors: [theme.colors.error.main, theme.colors.primary.main]
    },
    fill: {
      opacity: [1, 0.2]
    },
    theme: {
      mode: theme.palette.mode
    },
    markers: {
      hover: {
        sizeOffset: 1
      },
      shape: 'circle',
      size: 5,
      strokeWidth: 2,
      strokeOpacity: 1,
      strokeColors: theme.colors.alpha.white[100],
      colors: [theme.colors.error.main, theme.colors.primary.main]
    },
    colors: [theme.colors.error.main, theme.colors.primary.main],
    dataLabels: {
      enabled: false
    },
    legend: {
      labels: {
        useSeriesColors: true
      },
      itemMargin: {
        horizontal: 15,
        vertical: 15
      },
      show: true
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      labels: {
        show: true
      }
    },
    yaxis: {
      show: true,
      labels: {
        show: true
      }
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      strokeDashArray: 5,
      borderColor: theme.colors.alpha.black[10]
    }
  };

  const chartData = [
    {
      type: 'line',
      name: '值',
      data: metricData
    },
    {
      type: 'area',
      name: '异常分数',
      data: scoreData
    }
  ];

  return (
    <Card
      sx={{
        height: '100%'
      }}
    >
      <CardHeader
        title={
          <>
            {'Metrics and Scores'}{' '}
            <Typography
              variant="body2"
              component="span"
              fontWeight="bold"
              color="text.secondary"
            >
              ({'某某指标'})
            </Typography>
          </>
        }
      />
      <Divider />

      <Divider />
      <Box p={2}>
        {(
          <>
            <Chart
              options={chartOptions}
              series={chartData}
              type="line"
              height={322}
            />
            <Divider />
            <Box
              mt={2}
              sx={{
                textAlign: 'center'
              }}
            >
              {/* <Button
                size="small"
                variant="outlined"
                sx={{
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px'
                  }
                }}
              >
                {'View more activity charts'}
              </Button> */}
            </Box>
          </>
        )}
      </Box>
    </Card>
  );
}

export default Activity;
