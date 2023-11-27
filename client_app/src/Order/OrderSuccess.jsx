import React from 'react';
import PropTypes from 'prop-types';

OrderSuccess.propTypes = {

};

function OrderSuccess(props) {

    return (
        <div className="container fix_order">
            <h1>Bạn đã đặt hàng thành công</h1>
            <span style={{ fontSize: '1.2rem' }}>Vui lòng kiểm tra Email!</span>
        </div>
    );
}

export default OrderSuccess;