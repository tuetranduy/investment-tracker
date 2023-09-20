import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProductType,
  updateProductType,
} from 'src/actions/productTypeActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 30,
  },
}));

function AddProductTypeForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { productTypes } = useSelector((state) => state.productType);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={9}>
        {productTypes && (
          <MaterialTable
            title="Quản lý loại sản phẩm"
            columns={[{ title: 'Mô tả', field: 'description' }]}
            data={productTypes}
            editable={{
              onRowAdd: (newData) => dispatch(addProductType(newData)),
              onRowUpdate: (newData) => dispatch(updateProductType(newData)),
            }}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default AddProductTypeForm;
