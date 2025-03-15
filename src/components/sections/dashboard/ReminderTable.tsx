import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { DataGrid, GridColDef, useGridApiRef } from '@mui/x-data-grid';
import { useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<IReminderData>({
    id: 0,
    student: '',
    study: '',
    extra: '',
    sleep: '',
    social: '',
    physical: '',
    gpa: '',
    stress: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('New Entry:', formData);
    handleClose();
  };

  return (
    <Paper sx={{ p: 2, width: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
        <Typography variant="h5">Student Data (in hours per day)</Typography>
        <SearchFilter apiRef={apiRef} />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<IconifyIcon icon="heroicons-solid:plus" />}
          onClick={handleOpen}
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
      {/* Add New Entry Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Student Data</DialogTitle>
        <DialogContent>
          {Object.keys(formData).map(
            (key) =>
              key !== 'id' && (
                <TextField
                  key={key}
                  margin="dense"
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  name={key}
                  fullWidth
                  onChange={handleChange}
                />
              ),
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ReminderTable;
