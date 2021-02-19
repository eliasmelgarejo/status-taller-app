import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const SeccionComponent = ({ seccion, cantidad }) => {
    return (
        <div className='subTitleComponent col-12 col-md-6 col-xl-6'>
            <h3>{seccion} - {cantidad} </h3>
        </div>
    );
};

SeccionComponent.propTypes = {
    seccion: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired,
};

export default SeccionComponent;