import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';
import useApiClient from '../../../../api/apiClient';

const PractitionerAssociateComponent = ({ subCategoryId, serviceCallId, onClose }) => {
  const [practitioners, setPractitioners] = useState([]);
  const apiClient = useApiClient();

  useEffect(() => {
    // Fetch practitioners based on subCategoryId
    const fetchPractitioners = async () => {
      try {
        const response = await apiClient.get(`Practitioners?subCategoryId=${subCategoryId}`);
        // const data = await response.json();
        setPractitioners(response.response.practitioners);
        console.log(practitioners);
      } catch (error) {
        console.error('Error fetching practitioners:', error);
      }
    };
    fetchPractitioners();
  }, []);

  const handleAssociate = async (practitionerId) => {
    // Associate practitioner with service call
    try {
      await apiClient.patch(`ServiceCalls/${serviceCallId}/assign/${practitionerId}`);
      onClose(); // Close the dialog after association
    } 
    catch (error) {
      console.error('Error associating practitioner:', error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Associate Practitioner</DialogTitle>
      <DialogContent>
        <List>
          {practitioners.map((practitioner) => (
            <ListItem button onClick={() => handleAssociate(practitioner.practitionerId)} key={practitioner.id}>
              <ListItemText primary={`${practitioner.firstName} ,  `} />
              <ListItemText primary={`${practitioner.lastName} ,  `} />
              <ListItemText primary={`assigned service calls: ${practitioner.assignedServiceCalls} `} />
              <ListItemText primary={` started service calls: ${practitioner.startedServiceCalls} `} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PractitionerAssociateComponent;
