import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  Checkbox,
  Grid,
  Divider,
  Tooltip,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableContainer,
  TableRow,
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  InputAdornment
} from '@mui/material';
import Link from 'src/components/Link';
import type { Logging } from '@/models/fixed_log';
import { useTranslation } from 'react-i18next';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { format } from 'date-fns';

interface TableProps {
  logs: Logging[];
  probability?: number;
  threshold?: number;
}

interface Filters {
  category?: string;
}

const applyFilters = (
  logs: Logging[],
  query: string,
  filters: Filters
): Logging[] => {
  return logs.filter((log) => {
    let matches = true;

    if (query) {
      const properties = ['f1','lineId','label','timestamp','date','node','time','nodeRepeat','type','component','level','content','isError'];
      let containsQuery = false;

      properties.forEach((property) => {
        if ((log[property]).toString().toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      // if (filters.category && log.category !== filters.category) {
      //   matches = false;
      // }

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && log[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (
  warningInfos: Logging[],
  page: number,
  limit: number
): Logging[] => {
  return warningInfos.slice(page * limit, page * limit + limit);
};

const LogTable: FC<TableProps> = ({ logs, probability, threshold }) => {
  const [selectedLogs, setSelectedLogs] = useState<number[]>([]);
  const { t }: { t: any } = useTranslation();
  //   const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    category: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: '全部'
    },
    // {
    //   id: 'bad',
    //   name: '异常'
    // },
    // {
    //   id: 'good',
    //   name: '正常'
    // }
  ];

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllWarningInfos = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedLogs(event.target.checked ? logs.map((log) => parseInt(log.lineId)) : []);
  };

  const handleSelectOneWarning = (
    _event: ChangeEvent<HTMLInputElement>,
    logId: number
  ): void => {
    if (!selectedLogs.includes(logId)) {
      setSelectedLogs((prevSelected) => [...prevSelected, logId]);
    } else {
      setSelectedLogs((prevSelected) =>
        prevSelected.filter((id) => id !== logId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredLogs = applyFilters(logs, query, filters);
  const paginatedLogs = applyPagination(filteredLogs, page, limit);
  const selectedBulkActions = selectedLogs.length > 0;
  const selectedSomeLogs =
    selectedLogs.length > 0 && selectedLogs.length < logs.length;
  const selectedAllLogs = selectedLogs.length === logs.length;

  return (
    <>
      <Card
        sx={{
          p: 2,
          mb: 3,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Grid alignItems="center" container spacing={3}>
          <Grid item xs={12} lg={7} md={6}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoToneIcon />
                  </InputAdornment>
                )
              }}
              sx={{
                m: 0
              }}
              onChange={handleQueryChange}
              placeholder={t('搜索日志信息 ...')}
              value={query}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} lg={5} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{t('Status')}</InputLabel>
              <Select
                value={filters.category || 'all'}
                onChange={handleStatusChange}
                label={t('Status')}
              >
                {statusOptions.map((statusOption) => (
                  <MenuItem key={statusOption.id} value={statusOption.id}>
                    {statusOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>
      <Card>
        <Box pl={2} display="flex" alignItems="center">
          <Checkbox
            checked={selectedAllLogs}
            indeterminate={selectedSomeLogs}
            onChange={handleSelectAllWarningInfos}
          />
          {selectedBulkActions && (
            <Box flex={1} p={2}>
              {/* <BulkActions /> */}
            </Box>
          )}
          {!selectedBulkActions && (
            <Box
              flex={1}
              p={2}
              display={{ xs: 'block', sm: 'flex' }}
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography component="span" variant="subtitle1">
                  {t('Showing')}:
                </Typography>{' '}
                <b>{paginatedLogs.length}</b> <b>{t('Logs')}</b>
              </Box>
              {probability ? (
                <Box>
                  <Typography component="span" variant="subtitle1">
                    {t('异常概率')}:
                  </Typography>{' '}
                  <Typography
                  component="span"
                  variant="subtitle1"
                  color={probability > 30 ? "red" : "success"}
                  >
                    {t(`${probability}%`)}:
                  </Typography>{' '}
                </Box>
              ) : null}
              <TablePagination
                component="div"
                count={filteredLogs.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
              />
            </Box>
          )}
        </Box>
        <Divider />

        {paginatedLogs.length === 0 ? (
          <Typography
            sx={{
              py: 10
            }}
            variant="h3"
            fontWeight="normal"
            color="text.secondary"
            align="center"
          >
            {t('当前没有任何信息')}
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell>{t('#')}</TableCell> */}
                    <TableCell>{t('lineid')}</TableCell>
                    <TableCell>{t('isError')}</TableCell>
                    <TableCell>{t('Component')}</TableCell>
                    <TableCell>{t('Content')}</TableCell>
                    <TableCell>{t('date')}</TableCell>
                    <TableCell>{t('level')}</TableCell>
                    <TableCell>{t('time')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedLogs.map((log) => {
                    const isLogSelected = selectedLogs.includes(parseInt(log.lineId));
                    return (
                      <TableRow hover key={log.time} selected={isLogSelected}>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Checkbox
                              checked={isLogSelected}
                              onChange={(event) =>
                                handleSelectOneWarning(event, parseInt(log.lineId))
                              }
                              value={isLogSelected}
                            />
                            <Box pl={1}>
                              <Typography noWrap variant="subtitle2">
                                {log.lineId}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {log.isError}
                          </Typography>
                        </TableCell>
                        <TableCell>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h5">
                              {
                                <Link
                                onClick={() => {
                                  window.localStorage.setItem("selected_entity_id", log.component.toString())
                                  //console.log(warningInfo.entity_name)
                                }}
                                href='/knowledge/graph'
                                >
                                {log.component}
                                </Link>
                              }
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography
                            // color={
                            //   threshold
                            //     ? log.isError!='False'
                            //       ? 'error'
                            //       : 'success'
                            //     : 'info'
                            // }
                          >
                            {log.content}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {log.date}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography 
                          color={threshold ? (
                            log.isError != 'False'  ? "error" : "success"
                          ) : "info"}
                          noWrap
                          >
                            {log.level}
                          </Typography>
                        </TableCell>
                        <TableCell>
                        <Typography noWrap>
                            {log.time}
                          </Typography>
                          </TableCell>
                        {/* <TableCell align="center">
                          <Typography noWrap>
                            <Tooltip title={t('View')} arrow>
                              <IconButton
                                component={Link}
                                href="#"
                                color="primary"
                              >
                                <LaunchTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title={t('Delete')} arrow>
                              <IconButton
                                // onClick={handleConfirmDelete}
                                color="primary"
                              >
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box p={2}>
              <TablePagination
                component="div"
                count={filteredLogs.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 15]}
              />
            </Box>
          </>
        )}
      </Card>
    </>
  );
};

LogTable.propTypes = {
  logs: PropTypes.array.isRequired
};

LogTable.defaultProps = {
  logs: []
};

export default LogTable;
