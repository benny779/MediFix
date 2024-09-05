import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useApiClient from '../../../api';

const Practitioners = () => {
  const apiClient = useApiClient();
  const [practitioners, setPractitioners] = useState([]);
  const [expertises, setExpertises] = useState([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState(null);
  const [showExpertiseDialog, setShowExpertiseDialog] = useState(false);

  useEffect(() => {
    const fetchPractitioners = async () => {
      const { isSuccess, response } = await apiClient.get('Practitioners');
      if (isSuccess) {
        setPractitioners(response.items);
      }
    };
    const fetchExpertises = async () => {
      const { isSuccess, response } = await apiClient.get('Expertises');
      if (isSuccess) {
        setExpertises(response.items);
      }
    };

    fetchPractitioners();
    fetchExpertises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePractitionerRowClick = (practitioner) => {
    setSelectedPractitioner(practitioner);
  };

  const updatePractitionerExpertises = async (practitionerId) => {
    const { isSuccess, response } = await apiClient.get(
      `Practitioners/${practitionerId}/expertises`
    );

    if (isSuccess) {
      setSelectedPractitioner((prevPractitioner) => ({
        ...prevPractitioner,
        expertises: response.items,
      }));

      setPractitioners((prev) =>
        prev.map((p) =>
          p.practitionerId === practitionerId ? { ...p, expertises: response.items } : p
        )
      );
    }
  };

  const handleAddExpertise = async (expertiseId) => {
    const { practitionerId } = selectedPractitioner;

    const { isSuccess } = await apiClient.post(`Practitioners/${practitionerId}/expertises`, {
      expertiseId,
      practitionerId,
    });

    if (isSuccess) {
      await updatePractitionerExpertises(practitionerId);
    }
  };

  const handleRemoveExpertise = async (expertiseId) => {
    const { practitionerId } = selectedPractitioner;

    const { isSuccess } = await apiClient.delete(
      `Practitioners/${practitionerId}/expertises/${expertiseId}`
    );

    if (isSuccess) {
      await updatePractitionerExpertises(practitionerId);
    }
  };

  return (
    <Box display={'flex'}>
      <Box sx={{ flexGrow: 1, marginRight: 6 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {practitioners.map((practitioner) => (
                <TableRow
                  key={practitioner.practitionerId}
                  onClick={() => handlePractitionerRowClick(practitioner)}
                  hover
                  sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }}
                  selected={practitioner.practitionerId === selectedPractitioner?.practitionerId}>
                  <TableCell>{practitioner.firstName}</TableCell>
                  <TableCell>{practitioner.lastName}</TableCell>
                  <TableCell>{practitioner.email}</TableCell>
                  <TableCell>{practitioner.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {selectedPractitioner && (
        <Box component={Paper} sx={{ p: 2, width: 270 }}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant='h6'>Expertises</Typography>
            <Button
              variant='contained'
              color='primary'
              onClick={() => setShowExpertiseDialog(true)}>
              Add
            </Button>
          </Stack>
          <List>
            {selectedPractitioner.expertises.map((expertise) => (
              <ListItemButton key={expertise.id}>
                <ListItemText primary={expertise.name} />
                <IconButton onClick={() => handleRemoveExpertise(expertise.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemButton>
            ))}
          </List>

          <Dialog open={showExpertiseDialog} onClose={() => setShowExpertiseDialog(false)}>
            <DialogTitle>Add Expertise</DialogTitle>
            <DialogContent>
              {expertises
                .filter(
                  (expertise) => !selectedPractitioner.expertises.some((e) => e.id === expertise.id)
                )
                .map((expertise) => (
                  <div key={expertise.id}>
                    <Checkbox checked={false} onChange={() => handleAddExpertise(expertise.id)} />
                    {expertise.name}
                  </div>
                ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowExpertiseDialog(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Box>
  );
};

export default Practitioners;
