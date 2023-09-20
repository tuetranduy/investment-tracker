import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import List from '@material-ui/core/List';
import { Avatar, Box, Drawer, Hidden } from '@material-ui/core';

import navItemsList from './NavItemConfig';
import NavItem from './NavItem';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 300,
    backgroundColor: '#F0F0F0',
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 50,
    height: 50,
  },
}));

function SideBarNavigation() {
  const classes = useStyles();
  const { account } = useSelector((state) => state.account);

  const filteredNavItems = () => {
    if (account.role !== 1) {
      return navItemsList.filter((item) => !item.isAuth);
    }
    return navItemsList;
  };

  return (
    <>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          <Box height="100%" display="flex" flexDirection="column">
            <PerfectScrollbar options={{ suppressScrollX: true }}>
              <Box display="flex" justifyContent="center" p={2}>
                <Avatar
                  alt={account.avatar ? account.avatar : 'account'}
                  className={classes.avatar}
                  src={account.avatar ? account.avatar : ''}
                >
                  {account.name.charAt(0)}
                </Avatar>
              </Box>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
              >
                {navItemsList &&
                  filteredNavItems().map((item) => (
                    <NavItem
                      key={item.title}
                      icon={item.icon}
                      title={item.title}
                      href={item.href}
                    />
                  ))}
              </List>
            </PerfectScrollbar>
          </Box>
        </Drawer>
      </Hidden>
    </>
  );
}

export default SideBarNavigation;
