import React from 'react';
import { useParams } from 'react-router-dom';

const PractitionerServiceCallView = () => {
  const { id } = useParams();

  return <div>PractitionerServiceCallView: {id}</div>;
};

export default PractitionerServiceCallView;
