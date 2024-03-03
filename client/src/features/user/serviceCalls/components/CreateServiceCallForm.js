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
import React, { useState } from 'react';
import locations from '../locations.json';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

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

  const [buildings] = useState(locations.buildings.map((b) => ({ id: b.id, name: b.name })));
  const [floors, setFloors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [rooms, setRooms] = useState([]);

  const handleBuildingChange = (buildingId) => {
    const selectedBuilding = locations.buildings.find((building) => building.id === buildingId);
    const floors = selectedBuilding.floors.map((f) => ({ id: f.id, name: f.name }));
    setFloors(floors);
    setDepartments([]);
    setRooms([]);
  };

  const handleFloorChange = (floorId) => {
    const selectedBuilding = locations.buildings.find(
      (building) => building.id === getValues('building')
    );
    const selectedFloor = selectedBuilding.floors.find((floor) => floor.id === floorId);
    const departments = selectedFloor.departments.map((dep) => ({ id: dep.id, name: dep.name }));
    setDepartments(departments);
    setRooms([]);
  };

  const handleDepartmentChange = (departmentId) => {
    const selectedBuilding = locations.buildings.find(
      (building) => building.id === getValues('building')
    );
    const selectedFloor = selectedBuilding.floors.find((floor) => floor.id === getValues('floor'));
    const selectedDepartment = selectedFloor.departments.find((dep) => dep.id === departmentId);
    const rooms = selectedDepartment.rooms.map((room) => ({ id: room.id, name: room.name }));
    setRooms(rooms);
  };

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Grid container spacing={0} direction='column' alignItems='center' justifyContent='center'>
        <Paper sx={{ padding: 2 }}>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} marginBottom={2}>
              <FormControl fullWidth>
                <InputLabel>Building</InputLabel>
                <Select
                  label='Building'
                  {...register('building', { required: 'Building is required' })}
                  onChange={(e) => handleBuildingChange(e.target.value)}
                  error={!!errors.building}>
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
                <Select
                  label='Floor'
                  {...register('floor')}
                  onChange={(e) => handleFloorChange(e.target.value)}>
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
                  label='Department'
                  {...register('department')}
                  onChange={(e) => handleDepartmentChange(e.target.value)}>
                  {departments.map((dep) => (
                    <MenuItem key={dep.id} value={dep.id}>
                      {dep.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>
            </Stack>
            <Stack
              spacing={3}
              direction={{ xs: 'column', md: 'row' }}
              marginBottom={marginBetweenFormGroups}>
              <FormControl fullWidth sx={{ width: 320 }}>
                <InputLabel>Room</InputLabel>
                <Select label='Room' {...register('room')}>
                  {rooms.map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                      {room.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>With label + helper text</FormHelperText> */}
              </FormControl>

              <TextField label='Location details' type='text' fullWidth />
            </Stack>

            <Divider sx={{ marginBottom: marginBetweenFormGroups }} />

            <Stack
              spacing={3}
              direction={{ xs: 'column', md: 'row' }}
              marginBottom={marginBetweenFormGroups}>
              <TextField label='Type' type='text' />
              <TextField label='Category' type='text' />
              <TextField label='Sub Category' type='text' />
            </Stack>

            <Divider sx={{ marginBottom: marginBetweenFormGroups }} />

            <Stack marginBottom={4}>
              <TextField placeholder='Service call details' multiline rows={detailsTextFieldRows} />
            </Stack>
            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} marginBottom={2}>
              <TextField label='Priority' />
            </Stack>
            <Stack direction={'row-reverse'}>
              <Button type='submit' variant='contained' size='large' sx={{ paddingInline: 5 }}>
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
