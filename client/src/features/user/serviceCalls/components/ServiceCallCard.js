import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { formatJsonDateTime } from '../../../../utils/dateHelper';
import { CardActionArea, Chip } from '@mui/material';

const ServiceCallCard = (props) => {
  const { row } = props;

  const title = `${row.category.name} | ${row.subCategory.name}`;
  const dateCreated = `Created at ${formatJsonDateTime(row.dateCreated)}`;
  const currentStatus = `${row.currentStatus.status.name} (${formatJsonDateTime(
    row.currentStatus.dateTime
  )})`;
  const subTitle = (
    <>
      <div>{dateCreated}</div>
      <div>{currentStatus}</div>
    </>
  );

  return (
    <Card variant='outlined'>
      <CardActionArea>
        <CardHeader
          title={title}
          subheader={subTitle}
          action={<Chip size='small' label={row.type.name} />}
        />

        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {row.details}
          </Typography>
        </CardContent>

        {/* <CardActions disableSpacing>
        <IconButton>B</IconButton>
      </CardActions> */}
      </CardActionArea>
    </Card>
  );
};

export default ServiceCallCard;
