import React, { Component } from 'react';
import Orden from './Orden'
import PropTypes from 'prop-types';
import './style.css';


class DashboardBody extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            cantidad: props.ordenes.length,
            ordenes: props.ordenes,
            asesorSelected: props.asesorSelected,
         }
    }

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.asesorSelected !== this.state.asesorSelected) {
          this.setState({ asesorSelected: nextProps.asesorSelected });
          this.setState({ ordenes: nextProps.ordenes });
          console.log("SI HACE!!!!");
          console.log("SI HACE!!!! this.state"+this.state.ordenes.length);
          console.log("SI HACE!!!! nextProps"+nextProps.ordenes.length);
        }        
    }

    render() {  
        const { ordenes, asesorSelected, error } = this.state;
        var pendientes;

        if (this.setState.error) {
            return <p>{error.message}</p>
        }

        if(this.state.asesorSelected === "*"){
            pendientes = ordenes;
        }else{
            pendientes = ordenes.filter(orden => orden.asesor === asesorSelected);
            console.log("HOLA...");
        }

        console.log("Asesor en DashBoardBody: " + asesorSelected);
        console.log("PENDIENTES En DASHBOARD BODY...");
        console.log(pendientes);

        return (            

            <div className='row'>
                <div className='column align-self-start col-12 col-md-6 col-xl-6'>
                    <h3>Pendientes</h3>
                    <div className='areaComponent greenComponent'>
                        {pendientes.filter(orden => orden.seccion !== 'CYP' && orden.estado==='PENDIENTE')
                        .map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                    <h3>Con Trabajos</h3>
                    <div className='areaComponent redComponent'>
                        {pendientes.filter(orden => orden.seccion !== 'CYP' && orden.estado==='PROCESO')
                        .map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                    <h3>Terminados</h3>
                    <div className='areaComponent '>
                        {pendientes.filter(orden => orden.seccion !== 'CYP' && orden.estado==='TERMINADO')
                        .map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                </div>
                <div className='column align-self-start col-12 col-md-6 col-xl-6'>
                    <h3>Pendientes</h3>
                    <div className='areaComponent greenComponent'>
                        {pendientes.filter(orden => orden.seccion === 'CYP' && orden.estado==='PENDIENTE')
                        .map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                    <h3>Con Trabajos</h3>
                    <div className='areaComponent redComponent'>
                        {pendientes.filter(orden => orden.seccion === 'CYP' && orden.estado==='PROCESO')
                        .map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                    <h3>Terminados</h3>
                    <div className='areaComponent '>
                        {pendientes.filter(orden => orden.seccion === 'CYP' && orden.estado==='TERMINADO')
                        .map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                </div>
                
            </div>
        );
    }
}
 
export default DashboardBody;