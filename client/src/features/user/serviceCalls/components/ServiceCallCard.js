import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatJsonDateTime } from '../../../../utils/dateHelper';
import { Chip } from '@mui/material';

const ServiceCallCard = (props) => {
  const { row } = props;

  const title = `${row.category.name} | ${row.subCategory.name}`;
  const dateCreated = `Created at ${formatJsonDateTime(row.dateCreated)}`;
  const subTitle = `${dateCreated}
  ${row.currentStatus.value} (${formatJsonDateTime(row.currentStatus.dateTime)})`;

  return (
    <Card variant='outlined'>
      <CardHeader
        title={title}
        subheader={subTitle}
        action={<Chip size='small' label={row.serviceCallType.name} />}
      />

      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {row.details}
        </Typography>
      </CardContent>

      {/* <CardActions disableSpacing>
        <IconButton>B</IconButton>
      </CardActions> */}
    </Card>
  );
};

export default ServiceCallCard;
