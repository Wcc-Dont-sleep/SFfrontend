import {
  useState,
  MouseEvent,
  ChangeEvent,
  useCallback,
  useEffect
} from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  Divider,
  Button,
  Avatar,
  CardHeader,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
  styled,
  TextField,
  CardMedia
} from '@mui/material';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DetailEmployeePopup from './EmployeeManagement/DetailEmployeePopup';
import {
  EmployeeDetail,
  EmployeeEntity,
  EmployeeUpload,
  Salary
} from '@/models/employee';
import { humanResourceApi } from '@/apis/employee';
import { useRefMounted } from '@/hooks/useRefMounted';
import ProfileCoverNew from './Profile/ProfileCoverNew';
import { compareAsc, compareDesc, parse } from 'date-fns';
import React from 'react';

function EmployeeManagementTab() {
  const isMountedRef = useRefMounted();
  const [employees, setEmployees] = useState<EmployeeEntity[]>([]);

  const getAllData = useCallback(async () => {
    try {
      let employees = await humanResourceApi.getEmployees();

      if (isMountedRef()) {
        setEmployees(employees);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [upload, setUpload] = useState<EmployeeUpload>({
    id: null,
    name: '',
    gender: '',
    occupation: '',
    cover: 'http://dummyimage.com/800x300',
    avatar: 'http://dummyimage.com/150x150',
    birthday: '2001-01-01'
  } as EmployeeUpload);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {/* <Box pb={2}>
          <Typography variant="h3">餐厅用户级别表</Typography>
          <Typography variant="subtitle2">餐厅用户职级如下所示</Typography>
        </Box> */}

        {/* <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title="用户职位表"
            subheader="职位如下所示"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>角色</TableCell>

                  <TableCell>人数</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {levels.map((level: Salary) => (
                  <TableRow key={level.occupation} hover>
                    <TableCell>{level.occupation}</TableCell>
                    <TableCell>{level.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card> */}
      </Grid>

      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">添加新用户</Typography>
          <Typography variant="subtitle2">添加用户</Typography>
        </Box>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <Grid container>
                <Grid item xs={12}>
                  <ProfileCoverNew
                    upload={upload}
                    setSelectedUpload={(uploaded: EmployeeUpload) => {
                      setUpload(uploaded);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    size="large"
                    variant="contained"
                    fullWidth={true}
                    disabled={
                      !upload.name ||
                      upload.name === '' ||
                      !upload.gender ||
                      upload.gender === '' ||
                      !upload.occupation ||
                      upload.occupation === '' ||
                      !upload.birthday ||
                      upload.birthday === '' ||
                      !upload.avatar ||
                      upload.avatar === '' ||
                      !upload.cover ||
                      upload.cover === ''
                    }
                    onClick={() => {
                      console.log(upload);

                      if(upload.gender!='男'&&upload.gender!='女'){

                        alert("性别必须是男或者是女")
                        return;
                      }
      
                      if(compareAsc(parse(upload.birthday,"yyyy-MM-dd",Date.now()),Date.now())>=0){
      
                        alert("生日不允许超过当前日期")
                        return;
                      }

                      const conduct = async () => {
                        return await humanResourceApi.postEmployee({
                          id: null,

                          name: upload.name,
                          gender: upload.gender,
                          birthday: upload.birthday,
                          occupation: upload.occupation,

                          cover: upload.cover,
                          avatar: upload.avatar
                        } as EmployeeUpload);
                      };

                      conduct()
                        .then((value) => {
                          alert('添加成功：' + value+"\n请在表格中查看点击详情查看用户ID，并使用ID注册账号");

                          
                        })
                        .catch((value) => {
                          alert('添加失败：' + value);
                        });
                    }}
                  >
                    <UploadTwoToneIcon />
                    提交新用户
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">全体用户</Typography>
          <Typography variant="subtitle2">管理用户信息</Typography>
        </Box>

        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title="用户信息"
            subheader="点击查看用户详细信息"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>用户号</TableCell>
                  <TableCell>用户头像</TableCell>
                  <TableCell>用户名</TableCell>
                  <TableCell>用户性别</TableCell>
                  <TableCell>用户职位</TableCell>
                  {/* <TableCell>出勤率</TableCell>
                  <TableCell>获奖次数</TableCell> */}
                  <TableCell align="right">删除操作</TableCell>
                  <TableCell align="right">点击查看</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.sort((a,b)=>{
                if(a.id===b.id){
                  return 0;
                }
                return a.id<b.id? -1:1;
              })
                  .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                  .map((employee) => (
                    <TableRow key={employee.id} hover>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>
                        <Avatar src={employee.avatar} />
                      </TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.gender}</TableCell>
                      <TableCell>{employee.occupation}</TableCell>
                      {/* <TableCell>{employee.attendance_rate}</TableCell>
                      <TableCell>{employee.award_times}</TableCell> */}
                      <TableCell align="right">
                        <Tooltip placement="top" title="Delete" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.error.lighter
                              },
                              color: theme.palette.error.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => {
                              const conduct = async () => {
                                return humanResourceApi.deleteEmployee(
                                  employee.id
                                );
                              };

                              conduct()
                                .then((value) => {
                                  alert('删除结果：' + value + '\n');
                                  window.location.reload();
                                })
                                .catch((value) => {
                                  alert('删除失败：' + value);
                                });
                            }}
                          >
                            <DeleteTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        <DetailEmployeePopup key={employee.id} userId={employee.id} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={employees.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default EmployeeManagementTab;