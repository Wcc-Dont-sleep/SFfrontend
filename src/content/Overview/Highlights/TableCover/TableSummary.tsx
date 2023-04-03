import {
  Card,
  Tabs,
  Tab,
  Grid,
  Container
} from '@mui/material';
import { FC } from 'react';
import { styled } from '@mui/material/styles';
import SelfManagementTab from '@/content/HumanResource/Organization/SelfManagementTab';

//function TableSummary(cryptoSummary: CryptoSummary)
const TableSummary: FC = () => {

  const TabsWrapper = styled(Tabs)(
    () => `
      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }
  `
  );

  const tabs = [{ value: 'SelfManagementTab', label: '信息管理' }].concat([
          { value: 'EmployeeManagementTab', label: '用户管理' },
        ]

  )

  const user = {
    attends: [],
    /**
     * 头像url
     */
    avatar: null,
    birthday: '2001-07-05',
    /**
     * 首页封面url
     */
    cover: null,
    gender: 'male',
    id: '1',
    name: 'string',
    occupation: 'string',
    payrolls: [],
    prizes: [],
  }

  return (
    <Card>
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
              value={1}
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
            {(
              <SelfManagementTab user={user} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Card>
  );
};

export default TableSummary;
