import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addInvestmentType } from 'src/actions/investmentTypeAction';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 30,
  },
}));

function InvestmentTypeManagementForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { investmentTypes } = useSelector((state) => state.investmentType);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={9}>
        {investmentTypes && (
          <MaterialTable
            title="Investment Type Management"
            columns={[{ title: 'Type', field: 'name' }]}
            data={investmentTypes}
            editable={{
              onRowAdd: (newData) =>
                dispatch(addInvestmentType(newData))
                  .then(() => {})
                  .catch((error) =>
                    enqueueSnackbar(error.response.data.message, {
                      variant: 'error',
                    })
                  ),
              onRowUpdate: (newData) => dispatch(updateUser(newData)),
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

export default InvestmentTypeManagementForm;
