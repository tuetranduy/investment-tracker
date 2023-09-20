import { Box, Container, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProductTypes } from 'src/actions/productTypeActions';
import AddProductTypeForm from './AddProductTypeForm';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100%',
    paddingTop: theme.spacing(9),
    paddingBottom: theme.spacing(3),
  },
}));

function ProductTypeManagement() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductTypes());
  }, [dispatch]);

  return (
    <Container className={classes.root} maxWidth="lg">
      <Box mt={3}>
        <AddProductTypeForm />
      </Box>
    </Container>
  );
}

export default ProductTypeManagement;
