import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import HeaderBar from '../../components/header';
import Footer from '../../components/footer';

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

function MainLayout(props) {
    console.log('here')
    console.log(props)
    return (
        <Fragment>
            <HeaderBar/>
            {props.children}
            <Footer/>
        </Fragment>
    );
}

export default MainLayout;