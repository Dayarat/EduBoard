import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import IconifyIcon from 'components/base/IconifyIcon';
import SearchFilter from 'components/common/SearchFilter';
import CustomPagination from 'components/common/CustomPagination';

export interface IReminderData {
  id: number;
  student: string;
  study: string;
  extra: string;
  sleep: string;
  social: string;
  physical: string;
  gpa: string;
  stress: string;
}

interface ReminderTableProps {
  rows: IReminderData[];
}

export const columns: GridColDef[] = [
  { field: 'student', headerName: 'Student ID', flex: 1.5, minWidth: 120 },
  { field: 'study', headerName: 'Study', flex: 1, minWidth: 150, sortable: false },
  {
    field: 'extra',
    headerName: 'Extracurricular',
    flex: 1,
    minWidth: 150,
    sortable: false,
  },
  { field: 'sleep', headerName: 'Sleep', flex: 1, minWidth: 150 },
  { field: 'social', headerName: 'Social', flex: 1, minWidth: 150 },
  { field: 'physical', headerName: 'Physically Active', flex: 1, minWidth: 150 },
  { field: 'gpa', headerName: 'GPA', flex: 1, minWidth: 150 },
  { field: 'stress', headerName: 'Stress Level', flex: 1, minWidth: 150 },
];

const ReminderTable: React.FC<ReminderTableProps> = ({ rows }) => {
  const apiRef = useGridApiRef();

  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Typography variant="h5">Student Data (in hours per day)</Typography>
        <SearchFilter apiRef={apiRef} />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<IconifyIcon icon="heroicons-solid:plus" />}
        >
          <Typography variant="body2">Add New</Typography>
        </Button>
      </Stack>

      <Box sx={{ height: 430, width: '100%', mt: 2 }}>
        <DataGrid
          apiRef={apiRef}
          columns={columns}
          rows={rows}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
        />
      </Box>

      <CustomPagination apiRef={apiRef} />
    </Paper>
  );
};

export default ReminderTable;
