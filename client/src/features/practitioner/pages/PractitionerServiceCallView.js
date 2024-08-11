import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BuildIcon from '@mui/icons-material/Build';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { handleCallClick } from '../../../utils/browserHelper';
import { formatJsonDateTime } from '../../../utils/dateHelper';
import useApiClient from '../../../api';

const PractitionerServiceCallView = () => {
  const { id } = useParams();
  const { get, patch, post, error, isLoading, isSuccess } = useApiClient();
  const [item, setItem] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathName || '/';

  const onBack = () => {
    navigate(from);
  };

  const [closeDetails, setCloseDetails] = useState('');
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const [qrContent, setQrContent] = useState('');

  const handleCloseClick = () => {
    setIsQRDialogOpen(true);
  };

  const handleStartClick = async () => {
    const { isSuccess } = await patch(`serviceCalls/${id}/start`, {});
    console.log(isSuccess);
    if (isSuccess) {
      fetchServiceCall();
    }
  };

  const handleQRScan = async () => {
    // Simulating QR scan
    // const scannedContent = 'Simulated QR Content';
    // setQrContent(scannedContent);

    // try {
    //   const result = await post('verify-qr', { qrContent: scannedContent });
    //   if (result.ok) {
    //     setIsQRDialogOpen(false);
    //     handleServiceCallClose();
    //   } else {
    //     console.error('QR verification failed');
    //   }
    // } catch (error) {
    //   console.error('Error during QR verification:', error);
    // }

    handleServiceCallClose();
  };

  const handleServiceCallClose = async () => {
    console.log(closeDetails);
    const { isSuccess } = await post(`serviceCalls/${id}/close`, {
      serviceCallId: id,
      closeDetails,
    });
    if (isSuccess) {
      onBack();
    }
  };

  const fetchServiceCall = async () => {
    const { response, isSuccess } = await get(`serviceCalls/${id}`);

    isSuccess && setItem(response.serviceCall);
  };

  useEffect(() => {
    fetchServiceCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <CircularProgress />;
  if (!isSuccess) return;

  const isStarted = item?.currentStatus?.status?.value === 3;
  const isFinished = item?.currentStatus?.status?.value === 4;

  return (
    <Box>
      <IconButton onClick={onBack} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>

      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}>
            <Typography variant='h6'>{item.subCategory.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isStarted && <PlayArrowIcon color='success' sx={{ mr: 0.5 }} />}
              {item.type.name === 'Repair' ? (
                <BuildIcon fontSize='small' color='secondary' />
              ) : (
                <AddCircleOutlineIcon fontSize='small' color='primary' />
              )}
            </Box>
          </Box>

          <Typography variant='body1' sx={{ mb: 2 }}>
            {item.details}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography
                variant='body2'
                sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: 'large' }}>
                <PersonIcon fontSize='large' sx={{ mr: 0.5 }} />
                {item.client.fullName}
              </Typography>
              {item.client.phoneNumber && (
                <IconButton
                  size='large'
                  color='primary'
                  onClick={(e) => handleCallClick(e, item.client.phoneNumber)}
                  aria-label='Call client'>
                  <PhoneIcon fontSize='large' />
                </IconButton>
              )}
            </Box>

            <Divider sx={{ mb: 1 }} />

            <Typography
              variant='body2'
              sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: 'large' }}>
              <ApartmentIcon fontSize='large' sx={{ mr: 0.5 }} />
              {item.location.building.name}
            </Typography>
            <Typography
              variant='body2'
              sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: 'large' }}>
              <FormatListNumberedIcon fontSize='large' sx={{ mr: 0.5 }} />
              {item.location.floor.name}
            </Typography>
            <Typography
              variant='body2'
              sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: 'large' }}>
              <LocationOnIcon fontSize='large' sx={{ mr: 0.5 }} />
              {item.location.department.name}
            </Typography>
            <Typography
              variant='body2'
              sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: 'large' }}>
              <MeetingRoomIcon fontSize='large' sx={{ mr: 0.5 }} />
              {item.location.room.name}
            </Typography>

            <Divider sx={{ mb: 1 }} />

            <Typography
              variant='body2'
              sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: 'large' }}>
              <AccessTimeIcon fontSize='large' sx={{ mr: 0.5 }} />
              Created: {formatJsonDateTime(item.dateCreated)}
            </Typography>
            {isStarted && (
              <Typography
                variant='body2'
                sx={{ display: 'flex', alignItems: 'center', fontSize: 'large' }}>
                <AccessTimeIcon fontSize='large' sx={{ mr: 0.5 }} />
                Started: {formatJsonDateTime(item.currentStatus.dateTime)}
              </Typography>
            )}
          </Box>

          {(isStarted || isFinished) && (
            <TextField
              fullWidth
              multiline
              rows={4}
              variant='outlined'
              label='Close Details'
              value={item.closeDetails || closeDetails}
              onChange={(e) => setCloseDetails(e.target.value)}
              disabled={isFinished}
              sx={{ mb: 2 }}
            />
          )}

          {!isFinished && (
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={isStarted ? handleCloseClick : handleStartClick}>
              {isStarted ? 'Close' : 'Start'}
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={isQRDialogOpen} onClose={() => setIsQRDialogOpen(false)}>
        <DialogTitle>Scan QR Code</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <QrCodeScannerIcon sx={{ fontSize: 100 }} />
          </Box>
          <Typography>Please scan the QR code to proceed with closing the service call.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsQRDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleQRScan} variant='contained' color='primary'>
            Scan QR Code
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PractitionerServiceCallView;
