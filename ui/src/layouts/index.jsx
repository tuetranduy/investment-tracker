import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TopBarNavigation from 'src/layouts/TopBar/TopBarNavigation';
import SideBarNavigation from './NavBar/SideBarNavigation.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
}));

function MainLayout({ children }) {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBarNavigation onMobileNavOpen={() => setMobileNavOpen(true)} />
      <SideBarNavigation
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
