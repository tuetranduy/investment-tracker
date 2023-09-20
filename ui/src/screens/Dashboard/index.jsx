import { Box, Button, Container, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from 'src/actions/productActions';
import { getProductTypes } from 'src/actions/productTypeActions';
import { getUsers } from 'src/actions/userActions';
import StatCard from 'src/components/StatCard';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(3),
  },
}));

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getUsers());
    dispatch(getProductTypes());
  }, [dispatch]);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Box mt={3}>
        <Button color="primary" variant="outlined">
          Add investment
        </Button>
      </Box>

      <Grid>
        <StatCard />
      </Grid>
    </Container>
  );
}

export default Dashboard;
