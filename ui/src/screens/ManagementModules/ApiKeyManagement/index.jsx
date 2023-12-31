import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ApiKeyManagementForm from './ApiKeyManagementForm';
import { getApiInformations } from 'src/actions/apiInformationActions';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(3),
  },
}));

function ApiKeyManagement() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApiInformations());
  }, [dispatch]);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Box mt={3}>
        <ApiKeyManagementForm />
      </Box>
    </Container>
  );
}

export default ApiKeyManagement;
