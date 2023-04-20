import { useRefMounted } from '@/hooks/useRefMounted';
import { EmployeeDetail, EmployeeEntity } from '@/models/employee';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  TablePagination
} from '@mui/material';

import {
  useState,
  MouseEvent,
  ChangeEvent,
  useCallback,
  useEffect
} from 'react';

const initial_employees: EmployeeEntity[] = [
  {
    id: 'xxx',
    name: 'XXXXX',
    gender: 'X',
    occupation: 'XXXXX',
    birthday: 'XXXXX',
    attendance_rate: 0,
    award_times: 0,
    avatar: 'http://dummyimage.com/100x100'
  },
  {
    id: 'xxx',
    name: 'XXXXX',
    gender: 'X',
    occupation: 'XXXXX',
    birthday: 'XXXXX',
    attendance_rate: 0,
    award_times: 0,
    avatar: 'http://dummyimage.com/100x100'
  },
  {
    id: 'xxx',
    name: 'XXXXX',
    gender: 'X',
    occupation: 'XXXXX',
    birthday: 'XXXXX',
    attendance_rate: 0,
    award_times: 0,
    avatar: 'http://dummyimage.com/100x100'
  },
  {
    id: 'xxx',
    name: 'XXXXX',
    gender: 'X',
    occupation: 'XXXXX',
    birthday: 'XXXXX',
    attendance_rate: 0,
    award_times: 0,
    avatar: 'http://dummyimage.com/100x100'
  },
  {
    id: 'xxx',
    name: 'XXXXX',
    gender: 'X',
    occupation: 'XXXXX',
    birthday: 'XXXXX',
    attendance_rate: 0,
    award_times: 0,
    avatar: 'http://dummyimage.com/100x100'
  },
  {
    id: 'xxx',
    name: 'XXXXX',
    gender: 'X',
    occupation: 'XXXXX',
    birthday: 'XXXXX',
    attendance_rate: 0,
    award_times: 0,
    avatar: 'http://dummyimage.com/100x100'
  }
];

function Stuff({
  employees
}: {
  user: EmployeeDetail;
  employees: EmployeeEntity[];
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

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

  return (
    <Card>
      <CardHeader title="同权限人员" />
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
          {employees.sort((a,b)=>{
                if(a.id===b.id){
                  return 0;
                }
                return a.id<b.id? -1:1;
              })
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((stuff: EmployeeEntity) => (
              <Grid key={stuff.id} item xs={12} sm={6} lg={4}>
                <Box p={3} display="flex" alignItems="flex-start">
                  <Avatar src={stuff.avatar} />
                  <Box pl={2}>
                    <Typography gutterBottom variant="subtitle2">
                      {stuff.id}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      {stuff.name}
                    </Typography>
                    <Typography color="text.primary" sx={{ pb: 2 }}>
                      {stuff.occupation}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Box>
      <Box p={2}>
        <TablePagination
          component="div"
          count={employees.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[6]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Card>
  );
}

export default Stuff;
