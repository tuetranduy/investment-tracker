import { Container, Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import StatCard from 'src/components/StatCard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(3),
  },

  container: {
    paddingTop: 15,
    justifyContent: 'center',
  },
}));

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid container spacing={3} className={classes.container}>
        <Grid item lg={4}>
          <StatCard
            title="Total Investment Capital"
            icon={
              <MonetizationOnIcon style={{ fontSize: 50, color: '#4F709C' }} />
            }
          />
        </Grid>

        <Grid item lg={4}>
          <StatCard
            title="Current Capital"
            icon={
              <AccountBalanceIcon style={{ fontSize: 50, color: '#4F709C' }} />
            }
          />
        </Grid>

        <Grid item lg={4}>
          <StatCard
            title="Revenue"
            icon={<TrendingUpIcon style={{ fontSize: 50, color: '#4F709C' }} />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
