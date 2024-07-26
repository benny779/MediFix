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
import { formatJsonDateTime } from '../../../../utils/dateHelper';
import { Tooltip, Dialog } from '@mui/material';
import { lightGreen, yellow } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import CableIcon from '@mui/icons-material/Cable';
import PractitionerAssociateComponent from './Associate'; // Ensure the path is correct

const tableHeaders = ['Category', 'Created', 'Closed', 'Details', 'Location', 'Status', 'Technician', ''];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [openAssociateDialog, setOpenAssociateDialog] = useState(false);
  const green = lightGreen.A400;
  const myYellow = yellow[400];
  const deleteTitleString = 'Cannot be canceled - Already assigned to a technician';
  const editTitleString = 'This call cannot be edited due to being assigned to a technician';
  const associateTitleString = 'This call cannot be assigned to an already assigned technician';

  const { location } = row;
  const building = location.building.name;
  const floor = location.floor.name;
  const department = location.department.name;
  const room = location.room.name;
  const subCategoryId = row.subCategory.id;
  const serviceCallId = row.id;

  const category = `${row.category.name} | ${row.subCategory.name}`;
  const depAndRoom = `${department} - ${room}`;
  const locationString = `Building ${building}, Floor ${floor}, ${department}, Room ${room}`;

  const closedDateTime =
    row.currentStatus.status.value === 4 /*Closed*/ ? formatJsonDateTime(row.currentStatus.dateTime) : null;

  const handleRowClick = () => {
    console.log('Row clicked:', row);
    // Add logic to handle row click here
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

  const handleAssociate = (event) => {
    event.stopPropagation();
    console.log('Associate service call:', serviceCallId);
    setOpenAssociateDialog(true);
  };

  return (
    <Fragment>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }} onClick={handleRowClick}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{category}</TableCell>
        <TableCell>{formatJsonDateTime(row.dateCreated)}</TableCell>
        <TableCell>{closedDateTime}</TableCell>
        <TableCell>{row.details}</TableCell>
        <Tooltip title={locationString}>
          <TableCell>{depAndRoom}</TableCell>
        </Tooltip>
        <TableCell>{row.currentStatus.status.name}</TableCell>
        <TableCell>{row.practitioner?.fullName}</TableCell>
        <TableCell>
          {row.practitioner ? (
            <Tooltip title={deleteTitleString}>
              <span>
                <IconButton disabled>
                  <DeleteIcon />
                </IconButton>
              </span>
            </Tooltip>
          ) : (
            <Tooltip title={'Cancel Service Call'}>
              <IconButton aria-label="Cancelation" sx={{ color: green }} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}

          {row.practitioner ? (
            <Tooltip title={editTitleString}>
              <span>
                <IconButton disabled>
                  <CreateIcon />
                </IconButton>
              </span>
            </Tooltip>
          ) : (
            <Tooltip title={'Edit Service Call'}>
              <IconButton aria-label="create" sx={{ color: myYellow }} onClick={handleEdit}>
                <CreateIcon />
              </IconButton>
            </Tooltip>
          )}
          {row.practitioner ? (
            <Tooltip title={associateTitleString}>
              <span>
                <IconButton disabled>
                  <CableIcon />
                </IconButton>
              </span>
            </Tooltip>
          ) : (
            <Tooltip title={'Associate Service Call'}>
              <IconButton aria-label="associate" sx={{ color: myYellow }} onClick={handleAssociate}>
                <CableIcon />
              </IconButton>
            </Tooltip>
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Status History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.statusUpdates.map((historyRow) => (
                    <TableRow key={historyRow.dateTime}>
                      <TableCell component="th" scope="row">
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
      <Dialog open={openAssociateDialog} onClose={() => setOpenAssociateDialog(false)}>
        <PractitionerAssociateComponent 
          subCategoryId={subCategoryId}
          serviceCallId={serviceCallId} 
          onClose={() => setOpenAssociateDialog(false)}
        />
      </Dialog>
    </Fragment>
  );
}

function ServiceCallsTable({ serviceCalls }) {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', maxHeight: '100%' }}>
      <TableContainer sx={{ maxHeight: '100%' }}>
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
            {serviceCalls.serviceCalls.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ServiceCallsTable;
