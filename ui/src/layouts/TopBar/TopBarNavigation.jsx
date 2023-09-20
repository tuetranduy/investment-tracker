import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useHistory } from 'react-router-dom';
import { Box, Hidden } from '@material-ui/core';
import ChangePasswordForm from 'src/screens/AccountManagement/ChangePasswordForm';
import { useDispatch } from 'react-redux';
import { logout } from 'src/actions/accountActions';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    backgroundColor: '#264653',
  },
  toolbar: {
    minHeight: 64,
  },
}));

function TopBarNavigation({ onMobileNavOpen, isAuth, ...rest }) {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNavi, setAnchorElNavi] = React.useState(null);
  const open = Boolean(anchorEl);
  const openNaviMenu = Boolean(anchorElNavi);
  const [openChangePassword, setOpenChangePassword] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavigationMenu = (event) => {
    setAnchorElNavi(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseNaviMenu = () => {
    setAnchorElNavi(null);
  };

  const handleClickProductManagement = () => {
    history.push('/admin/product-management');
    setAnchorElNavi(null);
  };

  const handleClickListUsers = () => {
    history.push('/admin/user-management');
    setAnchorElNavi(null);
  };

  const handleClickProductTypeManagement = () => {
    history.push('/admin/product-type-management');
    setAnchorElNavi(null);
  };

  const handleOpenChangePassword = () => {
    setAnchorEl(null);
    setOpenChangePassword(true);
  };

  const handleClickLogOut = () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  return (
    <AppBar className={classes.root} {...rest}>
      <Toolbar className={classes.toolbar}>
        {true && (
          <Hidden lgUp>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon onClick={handleNavigationMenu} />
            </IconButton>
          </Hidden>
        )}
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNavi}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={openNaviMenu}
          onClose={handleCloseNaviMenu}
        >
          <MenuItem onClick={handleClickProductManagement}>
            Quản lý sản phẩm
          </MenuItem>
          <MenuItem onClick={handleClickListUsers}>Quản lý người dùng</MenuItem>
          <MenuItem onClick={handleClickProductTypeManagement}>
            Quản lý loại sản phẩm
          </MenuItem>
        </Menu>
        <Typography variant="h6" className={classes.title}>
          Investment Tracker
        </Typography>
        {auth && (
          <Box flexGrow={1} ml={2} textAlign="end">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              {/* <MenuItem onClick={handleClose}>Hồ Sơ</MenuItem> */}
              <MenuItem onClick={handleOpenChangePassword}>
                Đổi mật khẩu
              </MenuItem>
              <MenuItem onClick={handleClickLogOut}>Đăng Xuất</MenuItem>
            </Menu>
            <ChangePasswordForm
              open={openChangePassword}
              setOpen={setOpenChangePassword}
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBarNavigation;
