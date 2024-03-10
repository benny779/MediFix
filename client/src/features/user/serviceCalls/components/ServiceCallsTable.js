import * as React from 'react';
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
import demo from '../demo.json';
import { formatJsonDateTime } from '../../../../utils/dateHelper';
import { Tooltip } from '@mui/material';

const tableHeaders = [
  'Category',
  'Created',
  'Closed',
  'Details',
  'Location',
  'Status',
  'Technician',
];

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const { location } = row;
  const building = location.building.name;
  const floor = location.floor.name;
  const department = location.department.name;
  const room = location.room.name;

  const category = `${row.category.name} | ${row.subCategory.name}`;
  const locationString = `Building ${building}, Floor ${floor}, ${department}, Room ${room}`;

  const closedDateTime =
    row.currentStatus.id === 4 && formatJsonDateTime(row.currentStatus.dateTime);

  return (
    <React.Fragment>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{category}</TableCell>
        <TableCell>{formatJsonDateTime(row.dateCreated)}</TableCell>
        <TableCell>{closedDateTime}</TableCell>
        <TableCell>{row.details}</TableCell>
        <Tooltip title={locationString}>
          <TableCell>{row.location.id}</TableCell>
        </Tooltip>
        <TableCell>{row.currentStatus.value}</TableCell>
        <TableCell>{row.techinician.name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Status History
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.statuses
                    .sort((left, right) => left.id - right.id)
                    .map((historyRow) => (
                      <TableRow key={historyRow.id}>
                        <TableCell component='th' scope='row'>
                          {historyRow.value}
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
    </React.Fragment>
  );
}

const rows = demo;
console.log(rows);

export default function ServiceCallsTable() {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', maxHeight: '82vh' }}>
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
            {rows.map((row) => (
              <Row key={row.serviceCallId} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
