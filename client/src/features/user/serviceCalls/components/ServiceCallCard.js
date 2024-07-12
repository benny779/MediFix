import Card from '@mui/material/Card';
import {  lightGreen } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatJsonDateTime } from '../../../../utils/dateHelper';
import { Button, CardActionArea, Chip, IconButton, Tooltip } from '@mui/material';

const ServiceCallCard = (props) => {
  const { row } = props;
  const green  = lightGreen.A400
const titleString = 'Cannot be cancelled Already belongs to the technician';
  const title = `${row.category.name} | ${row.subCategory.name}`;
  const dateCreated = `Created at ${formatJsonDateTime(row.dateCreated)}`;
  const currentStatus = `${row.currentStatus.status.name} (${formatJsonDateTime(row.currentStatus.dateTime)})`;
  const subTitle = (
    <>
      <div>{dateCreated}</div>
      <div>{currentStatus}</div>
    </>
  );

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
          <Tooltip title={titleString}>
          <span>
            <Button disabled><DeleteIcon /></Button>
          </span>
        </Tooltip>
          
        ) : ( <IconButton aria-label="delete"sx={{color:green}} >
          <DeleteIcon  />
        </IconButton>
        )}
         
      </CardActionArea>
    </Card>
  );
};

export default ServiceCallCard;
