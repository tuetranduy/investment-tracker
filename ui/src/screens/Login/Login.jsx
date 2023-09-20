import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'src/actions/accountActions';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: 50,
  },
}));

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.account);

  if (account) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async (values) => {
        dispatch(login(values))
          .then(() => {
            return <Redirect to="/dashboard" />;
          })
          .catch(() =>
            enqueueSnackbar('Username / Password is incorrect', {
              variant: 'error',
            })
          );
      }}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <form className={classes.root} onSubmit={handleSubmit}>
          <Grid container direction="column" alignItems="center" spacing={3}>
            <Grid item xs={6} md={6}>
              <TextField
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
                id="username"
                name="username"
                placeholder="Username"
                label="Username"
                fullWidth
                required
                onChange={handleChange}
                value={values.username}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <TextField
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                id="password"
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
                fullWidth
                required
                onChange={handleChange}
                value={values.password}
              />
            </Grid>
            <Grid item xs={6} md={6}>
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

export default Login;
