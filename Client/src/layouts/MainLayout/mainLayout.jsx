import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import HeaderBar from '../../components/header';
import Footer from '../../components/footer';

MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

function MainLayout(props) {
    return (
        <div style={{display:'flex', flexDirection:'column', minHeight:'100vh'}}>
            <div>
                <HeaderBar/>
            </div>
            <div style={{marginTop: '64px', flex: 1}}>
                {props.children}
            </div>
            <div >
                <Footer /> 
            </div>
        </div>
    );
}

export default MainLayout;