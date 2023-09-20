import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';
import { NavLink as RouterLink } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%'
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: '#e63946',
    '& $title': {
      fontWeight: theme.typography.fontWeightBold
    },
    '& $icon': {
      color: '#e63946'
    }
  }
}));

function NavItem({ icon: Icon, title, href }) {
  const classes = useStyles();

  return (
    <ListItem>
      <Button
        activeClassName={classes.active}
        className={clsx(classes.button)}
        component={RouterLink}
        to={href}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
      </Button>
    </ListItem>
  );
}

export default NavItem;
