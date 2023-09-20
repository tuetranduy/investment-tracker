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

function ApiKeyManagement() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { account } = useSelector((state) => state.account);

  const getRoleName = (roleId) => {
    const matchingRole = ROLES.find(
      (role) => role.role_id === parseInt(roleId)
    );

    return matchingRole && matchingRole.name;
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={9}>
        {users && (
          <MaterialTable
            localization={{
              body: {
                deleteTooltip: 'Xoá',
                editTooltip: 'Sửa',
                addTooltip: 'Thêm',
                editRow: {
                  saveTooltip: 'Lưu',
                  cancelTooltip: 'Huỷ',
                },
              },
              header: {
                actions: 'Thao tác',
              },
              pagination: {
                labelRowsSelect: 'kết quả',
                labelDisplayedRows: '{from}-{to} trên {count}',
              },
              toolbar: {
                searchPlaceholder: 'Tìm kiếm',
              },
            }}
            title="Quản lý người dùng"
            columns={[
              { title: 'Tên', field: 'name' },
              { title: 'Tên người dùng', field: 'username' },
              {
                title: 'Quyền',
                field: 'role_id',
                lookup:
                  account && account.role === 1
                    ? { 1: 'Admin', 2: 'User' }
                    : { 2: 'User' },
                render: (rowData) => rowData && getRoleName(rowData.role_id),
              },
              {
                title: 'Trạng thái?',
                field: 'isActive',
                lookup: { true: 'Đang hoạt động', false: 'Không hoạt động' },
                render: (rowData) =>
                  rowData.isActive ? (
                    <Chip
                      label="Đang hoạt động"
                      variant="outlined"
                      color="primary"
                    />
                  ) : (
                    <Chip
                      label="Không hoạt động"
                      variant="outlined"
                      color="secondary"
                    />
                  ),
                initialEditValue: 1,
              },
            ]}
            data={users}
            editable={{
              onRowAdd:
                account.role === 1
                  ? (newData) => dispatch(addUser(newData))
                  : null,
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

export default ApiKeyManagement;
