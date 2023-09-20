import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserManagementListView from './UserManagementListView';
import { getUsers } from 'src/actions/userActions';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(3),
  },
}));

function UserManagement() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Box mt={3}>
        <UserManagementListView />
      </Box>
    </Container>
  );
}

export default UserManagement;
