import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInvestmentTypes } from 'src/actions/investmentTypeAction';
import InvestmentTypeManagementForm from './InvestmentTypeManagementForm';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(3),
  },
}));

function InvestmentTypeManagement() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInvestmentTypes());
  }, [dispatch]);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Box mt={3}>
        <InvestmentTypeManagementForm />
      </Box>
    </Container>
  );
}

export default InvestmentTypeManagement;
