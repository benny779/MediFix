import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import useApiClient from '../../../../api/apiClient';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useAuth } from '../../../authentication';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlert } from '../../../../context/AlertContext';

const detailsTextFieldRows = 5;

const required = 'Required';

const CreateServiceCallForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm();

  const apiClient = useApiClient();
  const { user } = useAuth();

  const { displayAlert } = useAlert();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [buildings, setBuildings] = useState([]);
  const [floors, setFloors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const handleBuildingChange = async (buildingId) => {
    await fetchFloors(buildingId);
    setDepartments([]);
    setRooms([]);
  };

  const handleFloorChange = async (floorId) => {
    await fetchDepartments(floorId);
    setRooms([]);
  };

  const handleDepartmentChange = async (departmentId) => {
    await fetchRooms(departmentId);
  };

  const handleCategoryChange = async (catId) => {
    console.log(catId);
    await fetchSubCategories(catId);
  };

  const fetchBuildings = async () => {
    const { isSuccess, response, error } = await apiClient.get('Locations/types/1');

    if (isSuccess) {
      setBuildings(response.locations);
    } else {
      displayAlert(error);
    }
  };

  const fetchFloors = async (buildingId) => {
    const { isSuccess, response, error } = await apiClient.get(`Locations/${buildingId}/children`);

    if (isSuccess) {
      setFloors(response.values);
    } else {
      displayAlert(error);
    }
  };

  const fetchDepartments = async (floorId) => {
    const { isSuccess, response, error } = await apiClient.get(`Locations/${floorId}/children`);

    if (isSuccess) {
      setDepartments(response.values);
    } else {
      displayAlert(error);
    }
  };

  const fetchRooms = async (depId) => {
    const { isSuccess, response, error } = await apiClient.get(`Locations/${depId}/children`);

    if (isSuccess) {
      setRooms(response.values);
    } else {
      displayAlert(error);
    }
  };

  const fetchCategories = async () => {
    const { isSuccess, response, error } = await apiClient.get(`Categories`);

    if (isSuccess) {
      setCategories(response.categories);
    } else {
      displayAlert(error);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    const { isSuccess, response, error } = await apiClient.get(`SubCategories/${categoryId}`);
    if (isSuccess) {
      setSubCategories(response.categories);
    } else {
      displayAlert(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchBuildings();
      await fetchCategories();
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    const serviceCall = {
      clientId: user.sub,
      locationId: data.room,
      serviceCallType: data.type,
      subCategoryId: data.subCategory,
      details: data.details,
      priority: data.priority,
    };

    const { isSuccess, error } = await apiClient.post('ServiceCalls', serviceCall);

    (isSuccess && navigate(from, { replace: true })) || displayAlert(error);
  };

  return (
    <>
      <Container maxWidth='md'>
        <Paper elevation={3} sx={{ padding: { xs: 2, md: 4 }, marginY: 4 }}>
          <Typography variant='h4' component='h1' gutterBottom marginBottom={2} align='center'>
            Service Call Request
          </Typography>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Building and Floor */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Building</InputLabel>
                  <Select
                    label='Building'
                    {...register('building', { required })}
                    onChange={(e) => handleBuildingChange(e.target.value)}
                    error={!!errors.building}
                    defaultValue=''>
                    {buildings.map((b) => (
                      <MenuItem key={b.id} value={b.id}>
                        {b.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{errors.building?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Floor</InputLabel>
                  <Select
                    label='Floor'
                    {...register('floor')}
                    onChange={(e) => handleFloorChange(e.target.value)}
                    disabled={!floors.length}
                    defaultValue=''>
                    {floors.map((f) => (
                      <MenuItem key={f.id} value={f.id}>
                        {f.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* Department and Room */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Department</InputLabel>
                  <Select
                    label='Department'
                    {...register('department')}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    disabled={!departments.length}
                    defaultValue=''>
                    {departments.map((dep) => (
                      <MenuItem key={dep.id} value={dep.id}>
                        {dep.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Room</InputLabel>
                  <Select
                    label='Room'
                    {...register('room')}
                    disabled={!rooms.length}
                    defaultValue=''>
                    {rooms.map((room) => (
                      <MenuItem key={room.id} value={room.id}>
                        {room.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {/* Type */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    label='Type'
                    {...register('type', { required: 'Type is required' })}
                    error={!!errors.type}
                    defaultValue=''>
                    {[
                      { name: 'New', value: 1 },
                      { name: 'Repair', value: 2 },
                    ].map((t) => (
                      <MenuItem key={t.value} value={t.value}>
                        {t.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{errors.type?.message}</FormHelperText>
                </FormControl>
              </Grid>
              {/* Category and SubCategory */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    label='Category'
                    {...register('category', { required: 'Category is required' })}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    error={!!errors.category}
                    defaultValue=''>
                    {categories.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{errors.category?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Sub Category</InputLabel>
                  <Select
                    label='Sub Category'
                    {...register('subCategory', { required: 'Sub category is required' })}
                    disabled={!subCategories.length}
                    error={!!errors.subCategory}
                    defaultValue=''>
                    {subCategories.map((sc) => (
                      <MenuItem key={sc.id} value={sc.id}>
                        {sc.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{errors.subCategory?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {/* Service call details */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label='Service call details'
                  placeholder='Describe the issue or request'
                  multiline
                  rows={detailsTextFieldRows}
                  {...register('details', { required })}
                  error={!!errors.details}
                  helperText={errors.details?.message}
                />
              </Grid>
              {/* Priority */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    label='Priority'
                    {...register('priority', { required })}
                    error={!!errors.priority}
                    defaultValue={1}>
                    {[
                      { name: 'Low', value: 1 },
                      { name: 'Medium', value: 2 },
                      { name: 'High', value: 3 },
                      { name: 'Critical', value: 4 },
                    ].map((p) => (
                      <MenuItem key={p.value} value={p.value}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>{errors.priority?.message}</FormHelperText>
                </FormControl>
              </Grid>
              {/* Submit button */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type='submit'
                    variant='contained'
                    size='large'
                    disabled={!isValid}
                    sx={{ minWidth: 120 }}>
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <DevTool control={control}></DevTool>
    </>
  );
};

export default CreateServiceCallForm;
