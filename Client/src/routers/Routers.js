import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import { configRoutes } from './configRoutes';
import ProtectedRoute from './ProtectedRoute';
import { ADMIN_LAYOUT, NO_LAYOUT, SYSTEM_LAYOUT } from '../constants/layout';
import AdminLayout from '../layouts/AdminLayout/adminLayout';
import MainLayout from '../layouts/MainLayout/mainLayout';
import SystemLayout from '../layouts/SystemLayout/systemLayout';

Routers.propTypes = {
    
};

const layouts = {
  [ADMIN_LAYOUT]: AdminLayout,
  [SYSTEM_LAYOUT]: SystemLayout,
  [NO_LAYOUT]: Fragment,
};

function Routers(props) {
    const routes = configRoutes
    return (
        <Routes>
            {routes.map((route, index) => {
                let Component = route.component;
                let Layout = layouts[route.layout] || MainLayout;
                if (route.protected) {
                  Component = (
                    <ProtectedRoute rolePermissions={route.rolePermissions}>
                      <Layout>
                        <route.component />
                      </Layout>
                    </ProtectedRoute>
                  );
                } else {
                  Component = (
                    <Layout>
                      <route.component />
                    </Layout>
                  );
                }

                return <Route key={index} path={route.path} element={Component} />;
            })}
        </Routes>
    );
}

export default Routers;