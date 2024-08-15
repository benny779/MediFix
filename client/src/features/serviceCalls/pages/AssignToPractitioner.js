import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Chip,
  ListItemAvatar,
  Avatar,
  Stack,
} from '@mui/material';
import useApiClient from '../../../api/apiClient';
import { useAlert } from '../../../context/AlertContext';

const AssignToPractitioner = ({ subCategoryId, serviceCallId, onClose }) => {
  const [practitioners, setPractitioners] = useState([]);
  const apiClient = useApiClient();
  const { displayAlert } = useAlert();

  useEffect(() => {
    const fetchPractitioners = async () => {
      const { response, isSuccess, error } = await apiClient.get(
        `Practitioners?subCategoryId=${subCategoryId}`
      );

      isSuccess ? setPractitioners(response.items) : displayAlert(error);
    };

    fetchPractitioners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAssign = async (practitionerId) => {
    const { isSuccess, error } = await apiClient.patch(
      `ServiceCalls/${serviceCallId}/assign/${practitionerId}`
    );
    !isSuccess && displayAlert(error);
    onClose(isSuccess);
  };

  return (
    <List>
      {practitioners.map((practitioner) => (
        <ListItem key={practitioner.id}>
          <ListItemButton onClick={() => handleAssign(practitioner.practitionerId)}>
            <Stack flexDirection={'row'} alignItems={'center'} flex={1} mr={6}>
              <ListItemAvatar>
                <Avatar>{`${practitioner.firstName[0]}${practitioner.lastName[0]}`}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={`${practitioner.firstName} ${practitioner.lastName}`} />
            </Stack>
            <Box>
              <Chip
                label={`${practitioner.assignedServiceCalls} Assigned`}
                size='small'
                color='primary'
                sx={{ mr: 1 }}
              />
              <Chip
                label={`${practitioner.startedServiceCalls} Started`}
                size='small'
                color='secondary'
              />
            </Box>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default AssignToPractitioner;
