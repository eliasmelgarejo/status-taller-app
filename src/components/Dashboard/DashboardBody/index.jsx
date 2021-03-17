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
            asesorSelected: props._asesorSelected,
            marcaSelected: props._marcaSelected,
         }
    }   

    // You don't have to do this check first, but it can help prevent an unneeded render
    componentWillReceiveProps(nextProps) {
        console.log("DashboardBody componentWillReceiveProps");
        console.log("nextProps", nextProps);
        console.log("this.state", this.state);
        
        if(this.state.asesorSelected !== nextProps.asesorSelected){

            this.setState({
                asesorSelected: nextProps.asesorSelected,
            });
                        
        }
    }

    render() {  
        
        if (this.setState.error) {
            return <p>{this.state.error.message}</p>
        }

        let filtradas = null;
        let _mec_pendientes = null,_mec_proceso = null,_mec_terminados = null,
        _cyp_pendientes = null,_cyp_proceso = null,_cyp_terminados = null;

        if(this.state.asesorSelected === "*"){
            console.log("DashboardBody render El filtro actual es TODOS ", this.state.asesorSelected );
            filtradas = this.state.ordenes;            
        }else{
            console.log("DashboardBody render this.state.asesorSelected ", this.state.asesorSelected);
            filtradas = this.state.ordenes.filter(orden => orden.asesor === this.state.asesorSelected);
        }  
        //lista de mec 
        _mec_pendientes = filtradas.filter(orden => orden.seccion !== 'CYP' && orden.estado==='PENDIENTE');
        _mec_proceso = filtradas.filter(orden => orden.seccion !== 'CYP' && orden.estado==='PROCESO');
        _mec_terminados = filtradas.filter(orden => orden.seccion !== 'CYP' && orden.estado==='TERMINADO');
        //lista de cyp
        _cyp_pendientes = filtradas.filter(orden => orden.seccion === 'CYP' && orden.estado==='PENDIENTE');
        _cyp_proceso = filtradas.filter(orden => orden.seccion === 'CYP' && orden.estado==='PROCESO');
        _cyp_terminados = filtradas.filter(orden => orden.seccion === 'CYP' && orden.estado==='TERMINADO');

        console.log("Asesor en DashBoardBody: " + this.state.asesorSelected);
        console.log("PENDIENTES En DASHBOARD BODY index.js...");
        console.log(filtradas);
        console.log('***********');
        console.log('_mec_pendientes',_mec_pendientes);
        console.log('_mec_proceso',_mec_proceso);
        console.log('_mec_terminados',_mec_terminados);
        console.log('_cyp_pendientes',_cyp_pendientes);
        console.log('_cyp_proceso',_cyp_proceso);
        console.log('_cyp_terminados',_cyp_terminados);
        console.log('***********');
        return (            

            <div className='row'>
                <div className='column align-self-start col-12 col-md-6 col-xl-6'>
                    <h3>Pendientes - {_mec_pendientes.length}</h3>
                    <div className='areaComponent greenComponent'>
                        {_mec_pendientes.map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                    <h3>Con Trabajos - {_mec_proceso.length} </h3>
                    <div className='areaComponent redComponent'>
                        {_mec_proceso.map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                    <h3>Terminados - {_mec_terminados.length} </h3>
                    <div className='areaComponent '>
                        {_mec_terminados.map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                </div>
                <div className='column align-self-start col-12 col-md-6 col-xl-6'>
                    <h3>Pendientes - {_cyp_pendientes.length} </h3>
                    <div className='areaComponent greenComponent'>
                        {_cyp_pendientes.map(orden => <Orden ot={orden}></Orden>)}
                    </div> 
                    <h3>Con Trabajos - {_cyp_proceso.length} </h3>
                    <div className='areaComponent redComponent'>
                        {_cyp_proceso.map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                    <h3>Terminados - {_cyp_terminados.length} </h3>
                    <div className='areaComponent'>
                        {_cyp_terminados.map(orden => <Orden ot={orden}></Orden>)}
                    </div>
                </div>
                
            </div>
        );
    }
}
 
export default DashboardBody;