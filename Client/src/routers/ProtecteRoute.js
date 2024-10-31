import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    rolePermissions: PropTypes.array.isRequired,
};

function ProtectedRoute(props) {
    const currentUser = useSelector((state)=> state.user.currentUser) || {};
    const systemConfiguration = useSelector((state)=> state.mfa.systemConfiguration);
    const isSystemConfigLoading = useSelector((state)=> state.mfa.isLoading);
    console.log('systemLoading', isSystemConfigLoading)
    const isLoading = useSelector((state)=> state.user.isLoading)
    const isRolePermissions = props.rolePermissions && props.rolePermissions.includes(currentUser?.role)
    const navigate = useNavigate();
    useEffect(()=> {
        //system config
        if(window.location.pathname.includes('system')) {
          if(window.location.pathname.includes('system/login')) {
            
          }
          else {
            if(systemConfiguration.id && !isSystemConfigLoading) {
              navigate(`/system/settings/`);
            }
            if(!systemConfiguration.id && !isSystemConfigLoading) {
              navigate(`/system/first-login/settings`)
            }
            //config first time login
            // if(systemConfiguration.id && currentUser.role == 'system' && !currentUser.isConfig) {

            // }
          }
        }



        if (Object.keys(currentUser).length === 0 && !isLoading) {
            toast.info('Please login first');
            if (window.location.pathname.includes('admin')) {
              navigate(`/admin/login?redirect=${window.location.pathname}`);
            } else if (window.location.pathname.includes('system')) {
              navigate(`/system/login?redirect=${window.location.pathname}`);
            } else {
              navigate(`/login?redirect=${window.location.pathname}`);
            }
        }
        //authorization 
        if (Object.keys(currentUser).length !== 0 && !isLoading && !isRolePermissions) {
            toast.error("Bạn không có quyền truy cập trang này");
            if (window.location.pathname.includes('admin')) {
                navigate(`/admin/login?redirect=${window.location.pathname}`);
              } else if (window.location.pathname.includes('system')) {
                navigate(`/system/login?redirect=${window.location.pathname}`);
              } else {
                navigate(`/`);
              }
        }
    }, [currentUser, navigate, isLoading]);
    return <Fragment>{currentUser && props.children}</Fragment>;
}

export default ProtectedRoute;