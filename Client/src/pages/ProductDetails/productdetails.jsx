import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

ProductDetails.propTypes = {
    
};

function ProductDetails(props) {
    const {productId} = useParams()
    console.log(productId)
    return (
        <div>
            product detail
        </div>
    );
}

export default ProductDetails;