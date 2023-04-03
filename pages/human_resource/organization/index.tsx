import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

import {
  Container,
  Tabs,
  Tab,
  Grid,
  Card,
  CardHeader,
  Divider,
  Typography,
  Button
} from '@mui/material';
import Footer from '@/components/Footer';
import { styled } from '@mui/material/styles';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {
  useState,
  ChangeEvent,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useCallback,
  useEffect
} from 'react';

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import ProfileCover from '@/content/HumanResource/Organization/Profile/ProfileCover';
import QuickLink from '@/content/HumanResource/Organization/Profile/QuickLink';
import Stuff from '@/content/HumanResource/Organization/Profile/Stuff';
import Summary from '@/content/HumanResource/Organization/Profile/Summary';

import SelfManagementTab from '@/content/HumanResource/Organization/SelfManagementTab';

import EmployeeManagementTab from '@/content/HumanResource/Organization/EmployeeManagementTab';
import { EmployeeDetail, EmployeeEntity } from '@/models/employee';
import { humanResourceApi } from '@/apis/employee';

import { compareAsc, endOfWeek, format, parse, startOfWeek } from 'date-fns';

import GlobalConfig from '@/utils/config';
import { useRouter } from 'next/router';
import { useRefMounted } from '@/hooks/useRefMounted';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function Organization() {
  const isMountedRef = useRefMounted();
  const [currentTab, setCurrentTab] = useState<string>('SelfManagementTab');

  const [tabs,setTabs]=useState(null);
  const [user,setUser]=useState<EmployeeDetail>(null);
  const [employees,setEmployees]=useState<EmployeeEntity[]>(null);


  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };


  const router=useRouter();

  const getAllData=useCallback(async ()=>{

    let user_data = await humanResourceApi.getEmployeeDetail(null);

    let employees_data = await humanResourceApi.getEmployees();


    setUser(user_data);

    setEmployees(employees_data);


    setTabs([{ value: 'SelfManagementTab', label: '信息管理' }].concat(
      user_data.occupation === '管理员'
        ? [
            { value: 'EmployeeManagementTab', label: '用户管理' },
          ]
        : []
    ));


  },[isMountedRef])



  useEffect(()=>{

    if(localStorage.getItem("token")===null||compareAsc(parse(localStorage.getItem("token_expire_time"),"yyyy-MM-dd HH:mm:ss",Date.now()),Date.now())<=0){
      localStorage.clear();
      router.replace('/login')

    }
    else{

      GlobalConfig.setAccessToken(localStorage.getItem("token"));

      GlobalConfig.setFrontendURL(window.location.host)

      getAllData();

    }

  },[getAllData])

  return (
    (tabs&&user&&employees)&&(<div key={user.id}>

      <Head>
        <title> 组织管理</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover key={user.id} user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Summary user={user} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stuff
              user={user}
              employees={employees.filter((employee: EmployeeEntity) => {
                return employee.occupation === user.occupation;
              })}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <QuickLink user={user} />
          </Grid>
        </Grid>
      </Container>

      
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'SelfManagementTab' && (
              <SelfManagementTab user={user} />
            )}
            {user.occupation === '管理员' &&
              currentTab === 'EmployeeManagementTab' && (
                <EmployeeManagementTab />
              )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>)
  );
}

Organization.getLayout = (
  page: boolean | ReactChild | ReactFragment | ReactPortal
) => <SidebarLayout>{page}</SidebarLayout>;

export default Organization;