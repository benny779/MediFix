import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ServiceCallTableRow from '../components/ServiceCallTableRow';
// import { useNavigate } from 'react-router-dom';

const tableHeaders = [
  'Category',
  'Created',
  // 'Closed',
  'Details',
  'Location',
  'Status',
  'Practitioner',
];
const actionButtonsHeader = 'Actions';
const clientHeader = 'Client';

function ServiceCallsTable({ serviceCalls, showActionButtons }) {
  const headers = [...tableHeaders];
  if (showActionButtons) {
    headers.splice(3, 0, clientHeader);
    headers.push(actionButtonsHeader);
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', maxHeight: '100%' }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              {headers.map((col) => (
                <TableCell key={col}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceCalls.map((row) => (
              <ServiceCallTableRow key={row.id} row={row} showActionButtons={showActionButtons} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ServiceCallsTable;
