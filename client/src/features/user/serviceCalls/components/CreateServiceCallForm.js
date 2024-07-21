import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import useApiClient from '../../../../api/apiClient';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useAuth } from '../../../authentication';
import { useLocation, useNavigate } from 'react-router-dom';

const detailsTextFieldRows = 5;
const marginBetweenFormGroups = 3;

const CreateServiceCallForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const apiClient = useApiClient();
  const { user } = useAuth();

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
    }
  };

  const fetchFloors = async (buildingId) => {
    const { isSuccess, response, error } = await apiClient.get(`Locations/${buildingId}/children`);

    if (isSuccess) {
      setFloors(response.values);
    }
  };

  const fetchDepartments = async (floorId) => {
    const { isSuccess, response, error } = await apiClient.get(`Locations/${floorId}/children`);

    if (isSuccess) {
      setDepartments(response.values);
    }
  };

  const fetchRooms = async (depId) => {
    const { isSuccess, response, error } = await apiClient.get(`Locations/${depId}/children`);

    if (isSuccess) {
      setRooms(response.values);
    }
  };

  const fetchCategories = async () => {
    const { isSuccess, response, error } = await apiClient.get(`Categories`);

    if (isSuccess) {
      setCategories(response.categories);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    const { isSuccess, response, error } = await apiClient.get(`SubCategories/${categoryId}`);
    if (isSuccess) {
      setSubCategories(response.categories);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchBuildings();
      await fetchCategories();
    };

    init();
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

    const { isSuccess, response, error } = await apiClient.post('ServiceCalls', serviceCall);

    // TODO: navigate to ServiceCalls
    isSuccess && navigate(from, { replace: true });
  };

  return (
    <>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
        <Paper sx={{ padding: 2 }}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} marginBottom={2}>
              <FormControl fullWidth>
                <InputLabel>Building</InputLabel>
                <Select
                  label="Building"
                  {...register('building', { required: 'Building is required' })}
                  onChange={(e) => handleBuildingChange(e.target.value)}
                  error={!!errors.building}
                >
                  {buildings.map((b) => (
                    <MenuItem key={b.id} value={b.id}>
                      {b.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.building?.message}</FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Floor</InputLabel>
                <Select label="Floor" {...register('floor')} onChange={(e) => handleFloorChange(e.target.value)}>
                  {floors.map((f) => (
                    <MenuItem key={f.id} value={f.id}>
                      {f.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  label="Department"
                  {...register('department')}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                >
                  {departments.map((dep) => (
                    <MenuItem key={dep.id} value={dep.id}>
                      {dep.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>
            </Stack>
            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} marginBottom={marginBetweenFormGroups}>
              <FormControl fullWidth sx={{ width: 320 }}>
                <InputLabel>Room</InputLabel>
                <Select label="Room" {...register('room')}>
                  {rooms.map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                      {room.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>

              {/* <TextField label="Location details" type="text" fullWidth /> */}
            </Stack>

            <Divider sx={{ marginBottom: marginBetweenFormGroups }} />

            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} marginBottom={marginBetweenFormGroups}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select label="Type" {...register('type', { required: 'type is required' })} error={!!errors.type}>
                  {[
                    { name: 'New', value: 1 },
                    { name: 'Repair', value: 2 },
                  ].map((t) => (
                    <MenuItem key={t.value} value={t.value}>
                      {t.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.type?.message}</FormHelperText>
              </FormControl>
            </Stack>
            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} marginBottom={marginBetweenFormGroups}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  {...register('category', { required: 'category is required' })}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  error={!!errors.category}
                >
                  {categories.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.category?.message}</FormHelperText>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Sub Category</InputLabel>
                <Select
                  label="Sub Category"
                  {...register('subCategory', { required: 'sub category is required' })}
                  error={!!errors.subCategory}
                >
                  {subCategories.map((sc) => (
                    <MenuItem key={sc.id} value={sc.id}>
                      {sc.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.subCategory?.message}</FormHelperText>
              </FormControl>
            </Stack>

            <Divider sx={{ marginBottom: marginBetweenFormGroups }} />

            <Stack marginBottom={4}>
              <TextField
                placeholder="Service call details"
                multiline
                rows={detailsTextFieldRows}
                {...register('details')}
              />
            </Stack>
            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} marginBottom={2}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select label="Priority" {...register('priority', { required: 'Priority is required' })}>
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
              </FormControl>
            </Stack>
            <Stack direction={'row-reverse'}>
              <Button type="submit" variant="contained" size="large" sx={{ paddingInline: 5 }}>
                Send
              </Button>
            </Stack>
          </form>
        </Paper>
      </Grid>
      <DevTool control={control}></DevTool>
    </>
  );
};

export default CreateServiceCallForm;
