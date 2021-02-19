import React from 'react';
import PropTypes from 'prop-types';
import SeccionComponent from './SeccionComponent';
import './style.css';


const TitleComponent = ({ cantidad_mec, cantidad_cyp }) => {
    return (
        <div className='titleComponent'>
            <div><h1>STATUS TALLER</h1></div>
            <div className='row'>
                <SeccionComponent seccion='MEC' cantidad={cantidad_mec} ></SeccionComponent>
                <SeccionComponent seccion='CYP' cantidad={cantidad_cyp} ></SeccionComponent>
            </div>
        </div>
    )
}

SeccionComponent.propTypes = {
    cantidad_mec: PropTypes.number.isRequired,
    cantidad_cyp: PropTypes.number.isRequired,
};

export default TitleComponent;