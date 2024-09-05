import React, { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { formatJsonDateTime } from '../../../utils/dateHelper';
import { Tooltip, Dialog, DialogTitle, DialogActions, Button, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignToPractitioner from './AssignToPractitioner';
import { refreshPage } from '../../../utils/browserHelper';
import { truncateText } from '../../../utils/stringHelper';
import { useNavigate } from 'react-router-dom';

const tableHeaders = [
  'Category',
  'Created',
  'Closed',
  'Details',
  'Location',
  'Status',
  'Practitioner',
  'Actions',
];

function ActionButtons({ row, onDelete, onEdit, onAssign }) {
  return (
    <Box display='flex' justifyContent='flex-end' gap={1}>
      {!row.practitioner && row.currentStatus.status.value !== 5 && (
        <>
          <Tooltip title={'Cancel'}>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={'Edit'}>
            <IconButton onClick={onEdit}>
              <CreateIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={'Assign to practitioner'}>
            <IconButton onClick={onAssign}>
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
}

function Row(props) {
  const { row } = props;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);

  const { location } = row;
  const building = location.building.name;
  const floor = location.floor.name;
  const department = location.department.name;
  const room = location.room.name;
  const subCategoryId = row.subCategory.id;
  const serviceCallId = row.id;

  const category = (
    <span>
      {row.category.name}
      <br />
      {row.subCategory.name}
    </span>
  );
  const depAndRoom = `${department} - ${room}`;
  const locationString = `Building ${building}, Floor ${floor}, ${department}, Room ${room}`;

  const closedDateTime =
    row.currentStatus.status.value === 4 /*Closed*/
      ? formatJsonDateTime(row.currentStatus.dateTime)
      : null;

  const handleRowClick = () => {
    navigate(`/serviceCalls/${row.id}`);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    console.log('Cancellation service call:', row.id);
    // Add logic to delete the service call here
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    console.log('Edit service call:', row.id);
    // Add logic to edit the service call here
  };

  const handleAssign = (event) => {
    event.stopPropagation();
    setOpenAssignDialog(true);
  };

  return (
    <Fragment>
      <TableRow
        hover
        sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }}
        onClick={handleRowClick}>
        <TableCell>
          <IconButton
            size='small'
            onClick={(event) => {
              event.stopPropagation();
              setOpen(!open);
            }}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{category}</TableCell>
        <TableCell>{formatJsonDateTime(row.dateCreated)}</TableCell>
        <TableCell>{closedDateTime}</TableCell>
        <Tooltip title={row.details} placement='left'>
          <TableCell>{truncateText(row.details, 50)}</TableCell>
        </Tooltip>
        <Tooltip title={locationString}>
          <TableCell>{depAndRoom}</TableCell>
        </Tooltip>
        <TableCell>{row.currentStatus.status.name}</TableCell>
        <TableCell>{row.practitioner?.fullName}</TableCell>
        <TableCell>
          <ActionButtons
            row={row}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onAssign={handleAssign}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1, marginLeft: 6 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Status History
              </Typography>
              <Table size='small' sx={{ width: 'auto' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.statusUpdates.map((historyRow) => (
                    <TableRow key={historyRow.dateTime}>
                      <TableCell component='th' scope='row'>
                        {historyRow.status.name}
                      </TableCell>
                      <TableCell>{formatJsonDateTime(historyRow.dateTime)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Dialog open={openAssignDialog} onClose={() => setOpenAssignDialog(false)}>
        <DialogTitle>Assign Practitioner</DialogTitle>
        <DialogContent>
          <AssignToPractitioner
            subCategoryId={subCategoryId}
            serviceCallId={serviceCallId}
            onClose={(refresh) => (refresh ? refreshPage() : setOpenAssignDialog(false))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssignDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

function ServiceCallsTable({ serviceCalls }) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', maxHeight: '100%' }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              {tableHeaders.map((col) => (
                <TableCell key={col}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceCalls.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ServiceCallsTable;
