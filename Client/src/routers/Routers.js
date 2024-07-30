import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import { configRoutes } from './configRoutes';
import ProtectedRoute from './ProtecteRoute';

Routers.propTypes = {
    
};

function Routers(props) {
    const routes = configRoutes
    return (
        <Routes>
            {routes.map((route, index) => {
                let Component = route.component;
                if(route.protected) {
                    Component = (
                        <ProtectedRoute rolePermissions={route.rolePermissions}>
                            <route.component/>
                        </ProtectedRoute>
                    )
                }
                else {
                    Component = (
                        <route.component/>
                    )
                }

                return <Route key={index} path={route.path} element={Component} />;
            })}
        </Routes>
    );
}

export default Routers;