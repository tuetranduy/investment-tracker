import React from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { ROLES } from 'src/constants/constants';
import { addUser, updateUser } from 'src/actions/userActions.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 30,
  },
}));

function UserManagementListView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { account } = useSelector((state) => state.account);

  const getRoleName = (roleId) => {
    const matchingRole = ROLES.find((role) => role.roleId === parseInt(roleId));

    return matchingRole && matchingRole.name;
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={9}>
        {users && (
          <MaterialTable
            title="Quản lý người dùng"
            columns={[
              { title: 'Name', field: 'name' },
              { title: 'Email', field: 'email' },
              { title: 'Username', field: 'username' },
              {
                title: 'Role',
                field: 'roleId',
                lookup:
                  account && account.role === 1
                    ? { 1: 'Admin', 2: 'User', 3: 'Guest' }
                    : { 2: 'User' },
                render: (rowData) => rowData && getRoleName(rowData.roleId),
              },
              {
                title: 'Is Active?',
                field: 'isActive',
                lookup: { true: 'Active', false: 'In-active' },
                render: (rowData) =>
                  rowData.isActive ? (
                    <Chip label="TRUE" variant="outlined" color="primary" />
                  ) : (
                    <Chip label="FALSE" variant="outlined" color="secondary" />
                  ),
                initialEditValue: 1,
              },
            ]}
            data={users}
            editable={{
              onRowAdd: (newData) => dispatch(addUser(newData)),
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

export default UserManagementListView;
