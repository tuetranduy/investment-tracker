/* eslint-disable react/no-array-index-key */
import React, { lazy, Suspense, Fragment } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen.jsx';
import Login from './screens/Login/Login';
import MainLayout from './layouts';
import AuthGuard from './components/AuthGuard';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/login" />,
  },
  {
    exact: true,
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    guard: AuthGuard,
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/dashboard',
        component: lazy(() => import('src/screens/Dashboard')),
      },
      {
        exact: true,
        path: '/investment-type-management',
        component: lazy(() =>
          import('src/screens/ManagementModules/InvestmentTypeManagement')
        ),
      },
      {
        exact: true,
        path: '/api-key-management',
        component: lazy(() =>
          import('src/screens/ManagementModules/ApiKeyManagement')
        ),
      },
      {
        component: () => <Redirect to="/404" />,
      },
    ],
  },
];

const renderRoutes = (routes) =>
  routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              render={(props) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      renderRoutes(route.routes)
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : null;

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
