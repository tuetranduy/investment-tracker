import React from 'react';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import userAPI from 'src/api/userAPI';

function ChangePasswordForm({ open, setOpen }) {
  const { enqueueSnackbar } = useSnackbar();
  const { account } = useSelector((state) => state.account);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Đổi mật khẩu</DialogTitle>
        <DialogContent>
          <Formik
            enableReinitialize
            validationSchema={Yup.object().shape({
              oldPassword: Yup.string().required('Old password is required!'),
              newPassword: Yup.string()
                .min(8, 'Password must be 8 characters or more!')
                .required('This field is required'),
              confirmNewPassword: Yup.string()
                .min(8, 'Password must be 8 characters or more!')
                .required('This field is required'),
            })}
            initialValues={{
              username: account.username || '',
              oldPassword: '',
              newPassword: '',
              confirmNewPassword: '',
            }}
            onSubmit={async (values) => {
              if (values.newPassword !== values.confirmNewPassword) {
                enqueueSnackbar(
                  'Confirm password and new password not match!',
                  {
                    variant: 'error',
                  }
                );
                return;
              }
              userAPI
                .updatePassword(values)
                .then((response) => {
                  enqueueSnackbar(response.data.message, {
                    variant: 'success',
                  });
                  handleClose();
                })
                .catch((error) => {
                  enqueueSnackbar(error.message, {
                    variant: 'error',
                  });
                });
            }}
          >
            {({ handleSubmit, values, handleChange, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="dense"
                  id="username"
                  label="Username"
                  type="text"
                  fullWidth
                  disabled
                  value={values.username}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="oldPassword"
                  label="Mật khẩu cũ"
                  type="password"
                  fullWidth
                  required
                  value={values.oldPassword}
                  onChange={handleChange}
                />
                <TextField
                  error={errors.newPassword && touched.newPassword}
                  margin="dense"
                  id="newPassword"
                  label="Mật khẩu mới"
                  type="password"
                  fullWidth
                  required
                  autoComplete="new-password"
                  value={values.newPassword}
                  onChange={handleChange}
                  helperText={errors.newPassword}
                />
                <TextField
                  error={
                    errors.confirmNewPassword && touched.confirmNewPassword
                  }
                  margin="dense"
                  id="confirmNewPassword"
                  label="Xác nhận mật khẩu mới"
                  type="password"
                  fullWidth
                  required
                  autoComplete="new-password"
                  value={values.confirmNewPassword}
                  onChange={handleChange}
                  helperText={errors.confirmNewPassword}
                />
                <DialogActions>
                  <Button onClick={handleClose} color="secondary">
                    Huỷ
                  </Button>
                  <Button color="primary" type="submit">
                    Lưu
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChangePasswordForm;
