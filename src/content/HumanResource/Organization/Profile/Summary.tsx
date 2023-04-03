import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled
} from '@mui/material';

import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { EmployeeDetail, Prize } from '@/models/employee';
import { endOfMonth,compareAsc, parse, startOfMonth, compareDesc } from 'date-fns';

import {
  differenceInYears,
  format,
  formatDistance,
  formatRelative,
  subDays
} from 'date-fns';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.primary.lighter};
    color: ${theme.colors.primary.main};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

function Summary({ user }: { user: EmployeeDetail }) {
  const theme = useTheme();


  return (
    <Card>
      <CardHeader title="用户资料"/>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <WorkIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h2">用户权限:</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="h3"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                
              </Typography>
              <Typography variant="h3">
              {user.occupation}
              </Typography>
            </Box>
            
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <MonetizationOnIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          

          <Box pt={2} display="flex">
            <Box pr={3}>
              <Typography
                //gutterTop
                variant="h3"
                //sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                生日：
              </Typography>
              <Typography variant="h3">
                {user.birthday}
              </Typography>
            </Box>
            <Box>
              <Typography
                //gutterTop
                variant="h3"
                //sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                年龄：
              </Typography>
              <Typography variant="h3">
              {differenceInYears(Date.now(), Date.parse(user.birthday))}岁
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <EmojiEventsIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">用户性别：</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="h3"
                //sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
              >
                {user.gender}
              </Typography>
              
            </Box>
            
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default Summary;
