// SelectField.js
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';

export const SelectField = ({
  name,
  label,
  options,
  register,
  errors,
  disabled,
  onChange,
  defaultValue,
}) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      label={label}
      {...register(name, { required: 'Required' })}
      onChange={onChange}
      error={!!errors[name]}
      disabled={disabled || options.length === 0}
      defaultValue={defaultValue}>
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.name}
        </MenuItem>
      ))}
    </Select>
    <FormHelperText error>{errors[name]?.message}</FormHelperText>
  </FormControl>
);
