import { useState, ReactElement, Ref, forwardRef } from 'react';
import type { FC, ChangeEvent } from 'react';
import PropTypes from 'prop-types';

// import numeral from 'numeral';

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Grid,
  Slide,
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
  Button,
  Typography,
  Dialog,
  FormControl,
  Select,
  InputLabel,
  InputAdornment,
  styled
} from '@mui/material';
import Link from 'src/components/Link';
import { Label } from '@mui/icons-material';

import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import type { WarningInfo } from '@/models/warning_info';
import { useTranslation } from 'react-i18next';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
// import Label from 'src/components/Label';
// import BulkActions from './BulkActions';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
// import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
import { warningInfoApi } from '@/apis/WarningInfoApi';

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color: ${theme.colors.error.main};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

interface TableProps {
  warningInfos: WarningInfo[]
}

interface Filters {
  status?: string;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const getLabel = (content: string): JSX.Element => {
  return (
    <Label color={'info'}>
      <b>{content}</b>
    </Label>
  );
};

const applyFilters = (
  warningInfos: WarningInfo[],
  query: string,
  filters: Filters
): WarningInfo[] => {
  return warningInfos.filter((warningInfo) => {
    let matches = true;

    if (query) {
      const properties = ['entity_name'];
      let containsQuery = false;

      properties.forEach((property) => {
        if (warningInfo[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (filters.status && warningInfo.status !== filters.status) {
        matches = false;
      }

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach((key) => {
      const value = filters[key];

      if (value && warningInfo[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
};

const applyPagination = (
  warningInfos: WarningInfo[],
  page: number,
  limit: number
): WarningInfo[] => {
  return warningInfos.slice(page * limit, page * limit + limit);
};

const Results: FC<TableProps> = ({ warningInfos }) => {
  const [selectedWarnings, setSelectedWarnings] = useState<number[]>([]);
  const { t }: { t: any } = useTranslation();
//   const { enqueueSnackbar } = useSnackbar();

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    status: 'unread'
  });

  const statusOptions = [
    {
      id: 'all',
      name: '全部'
    },
    {
      id: 'read',
      name: t('已读')
    },
    {
      id: 'unread',
      name: t('未读')
    },
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
    setSelectedWarnings(
      event.target.checked ? warningInfos.map((warning_info) => warning_info.id) : []
    );
  };

  const handleSelectOneWarning = (
    _event: ChangeEvent<HTMLInputElement>,
    warningId: number
  ): void => {
    if (!selectedWarnings.includes(warningId)) {
      setSelectedWarnings((prevSelected) => [...prevSelected, warningId]);
    } else {
        setSelectedWarnings((prevSelected) =>
        prevSelected.filter((id) => id !== warningId)
      );
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredWarningInfos = applyFilters(warningInfos, query, filters);
  const paginatedWarningInfos = applyPagination(filteredWarningInfos, page, limit);
  const selectedBulkActions = selectedWarnings.length > 0;
  const selectedSomeWarnings =
    selectedWarnings.length > 0 && selectedWarnings.length < warningInfos.length;
  const selectedAllWarnings = selectedWarnings.length === warningInfos.length;

  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  // const handleConfirmDelete = () => {
  //   setOpenConfirmDelete(true);
  // };

  const closeConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const handleDeleteCompleted = () => {
    setOpenConfirmDelete(false);
    // enqueueSnackbar(t('Delete action completed successfully'), {
    //   variant: 'success',
    //   anchorOrigin: {
    //     vertical: 'top',
    //     horizontal: 'right'
    //   },
    //   TransitionComponent: Zoom
    // });
  };

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
              placeholder={t('根据实体搜索异常信息 ...')}
              value={query}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} lg={5} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{t('Status')}</InputLabel>
              <Select
                value={filters.status || 'all'}
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
            checked={selectedAllWarnings}
            indeterminate={selectedSomeWarnings}
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
                <b>{paginatedWarningInfos.length}</b> <b>{t('条告警信息')}</b>
              </Box>
              <TablePagination
                component="div"
                count={filteredWarningInfos.length}
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

        {paginatedWarningInfos.length === 0 ? (
          <Typography
            sx={{
              py: 10
            }}
            variant="h3"
            fontWeight="normal"
            color="text.secondary"
            align="center"
          >
            {t("当前没有任何信息")}
          </Typography>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{t('#')}</TableCell>
                    <TableCell>{t('发生时间')}</TableCell>
                    <TableCell>{t('所在实体')}</TableCell>
                    <TableCell>{t('异常类型')}</TableCell>
                    <TableCell>{t('异常描述')}</TableCell>
                    <TableCell align="center">{t('Actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedWarningInfos.map((warningInfo) => {
                    const isWarningInfoSelected = selectedWarnings.includes(
                        warningInfo.id
                    );
                    return (
                      <TableRow
                        hover
                        key={warningInfo.id}
                        selected={isWarningInfoSelected}
                      >
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Checkbox
                              checked={isWarningInfoSelected}
                              onChange={(event) =>
                                handleSelectOneWarning(event, warningInfo.id)
                              }
                              value={isWarningInfoSelected}
                            />
                            <Box pl={1}>
                              <Typography noWrap variant="subtitle2">
                                {warningInfo.id}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {format(warningInfo.time, 'yyyy-MM-dd hh:mm:ss')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <Typography variant="h5">
                              {
                                <Link
                                onClick={() => {
                                  window.localStorage.setItem("selected_entity_id", warningInfo.entity_name.toString())
                                  //console.log(warningInfo.entity_name)
                                }}
                                href='/knowledge/graph'
                                >
                                {warningInfo.entity_name}
                                </Link>
                              }
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          {warningInfo.category}
                        </TableCell>
                        <TableCell>
                          <Typography
                          color={warningInfo.status === 'unread' ? 'error' : 'info'}
                          >
                            {warningInfo.description}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography noWrap>
                            <Tooltip title={`设置状态为${warningInfo.status === 'read' ? '未读' : '已读'}`} arrow>
                              <IconButton
                                href="#"
                                color="primary"
                                onClick={ () => warningInfoApi.updateWarningInfoStatus(warningInfo.id.toString(), warningInfo.status === 'read' ? 'unread' : 'read') }
                              >
                                <LaunchTwoToneIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box p={2}>
              <TablePagination
                component="div"
                count={filteredWarningInfos.length}
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

      <DialogWrapper
        open={openConfirmDelete}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDelete}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          p={5}
        >
          <AvatarError>
            <CloseIcon />
          </AvatarError>

          <Typography
            align="center"
            sx={{
              pt: 4,
              px: 6
            }}
            variant="h3"
          >
            {t('你确定要删除该信息吗')}?
          </Typography>

          <Typography
            align="center"
            sx={{
              pt: 2,
              pb: 4,
              px: 6
            }}
            fontWeight="normal"
            color="text.secondary"
            variant="h4"
          >
            {t("这是不可逆的")}
          </Typography>

          <Box>
            <Button
              variant="text"
              size="large"
              sx={{
                mx: 1
              }}
              onClick={closeConfirmDelete}
            >
              {t('Cancel')}
            </Button>
            <ButtonError
              onClick={handleDeleteCompleted}
              size="large"
              sx={{
                mx: 1,
                px: 3
              }}
              variant="contained"
            >
              {t('Delete')}
            </ButtonError>
          </Box>
        </Box>
      </DialogWrapper>
    </>
  );
};

Results.propTypes = {
  warningInfos: PropTypes.array.isRequired
};

Results.defaultProps = {
    warningInfos: []
};

export default Results;
