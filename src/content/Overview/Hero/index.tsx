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
import NotificationImportantTwoToneIcon from '@mui/icons-material/NotificationImportantTwoTone';
import LogTable from '@/content/DataDisplay/LogTable/LogTable';
import { loggingApi } from '@/apis/LoggingApi';
import { FixedLogs } from 'src/models/fixed_log';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  styled
} from '@mui/material';

import Link from 'src/components/Link';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(0.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const NextJsAvatar = styled(Box)(
  ({ theme }) => `
  width: ${theme.spacing(8)};
  height: ${theme.spacing(8)};
  border-radius: ${theme.general.borderRadius};
  background-color: #dfebf6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {
  const[datatype,setDatatype]=React.useState("");
  const[myname,setMyName]=React.useState("");
  const[mypassword,setMyPassword]=React.useState("");
  const [canClick, setCanClick] = useState(false);
  const handleClick = () => {
    console.log("provethisreallywork")
    window.localStorage.setItem("loggingdataset","")
    window.localStorage.setItem("loggingdatatype","")
    window.localStorage.setItem("metrixdataset","")
    window.localStorage.setItem("selected_entity_id","")
    if (myname=="tongji409" && mypassword=="409") {
      console.log('Button clicked');
      window.location.href = "/knowledge/graph";
      // 执行其他操作
    }
  };
  const handleNameChange  = (event: SelectChangeEvent) => {
    setMyName(event.target.value)
    updateCanClick(myname, mypassword);
  };
  const updateCanClick = (myname, mypassword) => {
    console.log(myname)
    console.log(mypassword)
    if (myname === 'tongji409' && mypassword === '409') {
      setCanClick(true);
    } else {
      setCanClick(false);
    }
  };
  const handlePasswordChange  = (event: SelectChangeEvent) => {
    setMyPassword(event.target.value)
    updateCanClick(myname, mypassword);
  };
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          <LabelWrapper color="success">Version 1.0.0</LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
          异常/故障检测模型原型
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 2.5, pb: 3 }}
            variant="h3"
            color="text.secondary"
            fontWeight="normal"
          >
            （通过知识图谱抽象再现系统架构并进行故障定位）
          </TypographyH2>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            {/* 面向云原生系统微服务应用的运维知识图谱 */}
          </TypographyH2>
        <div>
        <label>Name  </label>
        </div>
         {/* <Grid item xs={2}>
          <FormControl sx={{ m: 1, minWidth: 150 }}> */}
        <div>

          <input type="text" name="name" value={myname} onChange={handleNameChange} 
        style={{
          width: "300px", // 增加输入框的宽度
          border: "1px solid gray", // 设置输入框的边框样式为灰色
          borderRadius: "5px", // 设置边框的圆角半径为5像素
          padding: "8px", // 设置内边距
        }}/>
        </div> 
        <div style={{ marginBottom: "16px" }}></div>
        <div>
        <label>Password</label>
        </div>
        <div>

          <input type="password" name="email" value={mypassword} onChange={handlePasswordChange}
                  style={{
                    width: "300px", // 增加输入框的宽度
                    border: "1px solid gray", // 设置输入框的边框样式为灰色
                    borderRadius: "5px", // 设置边框的圆角半径为5像素
                    padding: "8px", // 设置内边距
                  }} />
        </div>
          {/* </FormControl>
           </Grid> */}
        <div style={{ marginBottom: "16px" }}></div>

          <Button
            // component={Link}
            // href="/knowledge/graph"
            size="large"
            variant="contained"
            onClick={
            handleClick
            }
            //  disabled={!canClick}
          >
            进入系统
          </Button>

          
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
