import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import HeaderBar from '../../components/header';
import Footer from '../../components/footer';

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

function AdminLayout(props) {
    return (
        <Fragment>
            {"admin"}
            {props.children}
        </Fragment>
    );
}

export default AdminLayout;