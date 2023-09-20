import { Box, Button, Container, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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

  useEffect(() => {}, [dispatch]);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Box mt={3} mb={3}>
        <Button color="primary" variant="outlined">
          Add investment
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item lg={3}>
          <StatCard />
        </Grid>

        <Grid item lg={3}>
          <StatCard />
        </Grid>

        <Grid item lg={3}>
          <StatCard />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
