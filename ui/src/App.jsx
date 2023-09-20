import React from 'react';
import { Router } from 'react-router';
import { SnackbarProvider } from 'notistack';
import { createStyles, makeStyles } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import 'react-image-lightbox/style.css';

import Routes from 'src/Routes';
import Auth from './components/Auth.jsx';

const history = createBrowserHistory();

const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
        width: '100%',
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
    },
  })
);

function App() {
  useStyles();

  return (
    <SnackbarProvider maxSnack={3}>
      <Router er history={history}>
        <Auth>
          <Routes />
        </Auth>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
