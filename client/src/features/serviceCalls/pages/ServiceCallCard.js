import Card from '@mui/material/Card';
import { lightGreen, yellow } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatJsonDateTime } from '../../../utils/dateHelper';
import { CardActionArea, Chip, IconButton, Tooltip } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import CableIcon from '@mui/icons-material/Cable';

const ServiceCallCard = (props) => {
  const { row } = props;
  const green = lightGreen.A400;
  const myYellow = yellow[400];
  const deleteTitleString = 'Cannot be cancelled Already belongs to the technician';
  const editTitleString = 'This call cannot be edited due to being assigned to a technician';
  const associateTitleString = 'This call cannot be assigned to an already assigned heel technician';

  const title = `${row.category.name} | ${row.subCategory.name}`;
  const dateCreated = `Created at ${formatJsonDateTime(row.dateCreated)}`;
  const currentStatus = `${row.currentStatus.status.name} (${formatJsonDateTime(row.currentStatus.dateTime)})`;
  const subTitle = (
    <>
      <div>{dateCreated}</div>
      <div>{currentStatus}</div>
    </>
  );
  const handleDelete = (event) => {
    event.stopPropagation();
    console.log('Cancelation service call:', row.Id);
    // Add your delete logic here
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    console.log('Edit service call:', row.Id);
    // Add your edit logic here
  };

  const handleAssociate = (event) => {
    event.stopPropagation();
    console.log('Associate service call:', row.Id);
    // Add your association logic here
  };

  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardHeader title={title} subheader={subTitle} action={<Chip size="small" label={row.type.name} />} />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {row.details}
          </Typography>
          <Typography>{row.practitioner?.fullName}</Typography>
        </CardContent>

        {/* <CardActions disableSpacing>
        <IconButton>B</IconButton>
      </CardActions> */}

        {row.practitioner ? (
          <Tooltip title={deleteTitleString}>
            <span>
              <IconButton disabled>
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        ) : (
          <Tooltip title={'Cancelation Service Call'}>
            {' '}
            <IconButton aria-label="Cancelation" sx={{ color: green }} onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}

        {row.practitioner ? (
          <Tooltip title={editTitleString}>
            <span>
              <IconButton disabled>
                <CreateIcon />
              </IconButton>
            </span>
          </Tooltip>
        ) : (
          <Tooltip title={'Edit Service Call'}>
            {' '}
            <IconButton aria-label="create" sx={{ color: myYellow }} onClick={handleEdit}>
              <CreateIcon />
            </IconButton>
          </Tooltip>
        )}
        {row.practitioner ? (
          <Tooltip title={associateTitleString}>
            <span>
              <IconButton disabled>
                <CableIcon />
              </IconButton>
            </span>
          </Tooltip>
        ) : (
          <Tooltip title={'Associate Service Call'}>
            {' '}
            <IconButton aria-label="associate" sx={{ color: myYellow }} onClick={handleAssociate}>
              <CableIcon />
            </IconButton>
          </Tooltip>
        )}
      </CardActionArea>
    </Card>
  );
};

export default ServiceCallCard;
