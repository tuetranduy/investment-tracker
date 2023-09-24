import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { addApiInformation } from 'src/actions/apiInformationActions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 30,
  },
}));

function ApiKeyManagementForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { apiInformations } = useSelector((state) => state.apiInformation);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={9}>
        {apiInformations && (
          <MaterialTable
            title="Investment Type Management"
            columns={[
              { title: 'Platform', field: 'description' },
              { title: 'API Key', field: 'api_key' },
              { title: 'API Secret', field: 'api_secret' },
            ]}
            data={apiInformations}
            editable={{
              onRowAdd: (newData) =>
                dispatch(addApiInformation(newData))
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

export default ApiKeyManagementForm;
