import { EmployeeDetail } from '@/models/employee';
import {
  Typography,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  ListItemText,
  Avatar,
  useTheme,
  styled
} from '@mui/material';

const ListWrapper = styled(List)(
  () => `
        .MuiListItem-root {
          border-radius: 0;
          margin: 0;
        }
  `
);

function QuickLink({ user }: { user: EmployeeDetail }) {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="快速访问" />
      <Divider />
      <ListWrapper disablePadding>
        <ListSubheader>
          <Typography sx={{ py: 1.5 }} variant="h4" color="text.primary">
            相关运维网站
          </Typography>
        </ListSubheader>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
          onClick={()=>{
            window.open("https://cn.aliyun.com/");
          }}
        >
          <ListItemText primary="阿里云"/>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
          onClick={()=>{
            window.open("https://cloud.tencent.com/");
          }}
        >
          <ListItemText primary="腾讯云" />
        </ListItem>
        <Divider />
        <ListSubheader>
          <Typography sx={{ py: 1.5 }} variant="h4" color="text.primary">
            平台监控网站
          </Typography>
        </ListSubheader>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
          onClick={()=>{
            window.open("https://grafana.com/")

          }}
        >
          <ListItemText primary="Grafana" />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            color: `${theme.colors.primary.main}`,
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}
          button
          onClick={()=>{
            window.open("https://prometheus.io/")

          }}
        >
          <ListItemText primary="Prometheus" />
        </ListItem>

        


        

        
        
      </ListWrapper>
    </Card>
  );
}

export default QuickLink;
