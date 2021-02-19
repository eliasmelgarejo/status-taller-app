import React, { Component } from 'react';
import Orden from './Orden'
import PropTypes from 'prop-types';
import './style.css';


class DashboardBody extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ordenes: props.ordenes,
         }
    }
    render() { 
        var pendientes = this.state.ordenes;
        return (            

            <div className='row'>
                <div className='column align-self-start col-12 col-md-6 col-xl-6'>
                    <h3>Pendientes</h3>
                    <div className='areaComponent greenComponent'>
                        {pendientes.filter(orden => orden.diasentaller===1 && orden.tiposervicio !== 'CHAPERIA'
                        && orden.estado!=='TERMINADO').map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                    <h3>Con Trabajos</h3>
                    <div className='areaComponent redComponent'>
                        {pendientes.filter(orden => orden.diasentaller>1 && orden.tiposervicio !== 'CHAPERIA'
                        && orden.estado!=='TERMINADO').map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                    <h3>Terminados</h3>
                    <div className='areaComponent '>
                        {pendientes.filter(orden => orden.diasentaller>1 && orden.tiposervicio !== 'CHAPERIA'
                        && orden.estado==='TERMINADO').map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                </div>
                <div className='column align-self-start col-12 col-md-6 col-xl-6'>
                    <h3>Pendientes</h3>
                    <div className='areaComponent greenComponent'>
                        {pendientes.filter(orden => orden.diasentaller===1 && orden.tiposervicio === 'CHAPERIA'
                        && orden.estado!=='TERMINADO').map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                    <h3>Con Trabajos</h3>
                    <div className='areaComponent redComponent'>
                        {pendientes.filter(orden => orden.diasentaller>1 && orden.tiposervicio === 'CHAPERIA'
                        && orden.estado!=='TERMINADO').map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                    <h3>Terminados</h3>
                    <div className='areaComponent '>
                        {pendientes.filter(orden => orden.diasentaller>1 && orden.tiposervicio === 'CHAPERIA'
                        && orden.estado==='TERMINADO').map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                </div>
                
            </div>
        );
    }
}
 
export default DashboardBody;

DashboardBody.propTypes = {
    mec: PropTypes.string.isRequired,
    cyp: PropTypes.string.isRequired,
};