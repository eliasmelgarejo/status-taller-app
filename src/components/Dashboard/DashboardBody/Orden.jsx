import React, { Component } from 'react';
import iconPreview from './../assets/baseline_preview_black.png';
import Popup from 'reactjs-popup';
import './style.css'; 

class Orden extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ot: props.ot,
        }   
    }

    onDetails = () => {
        //console.log('OT Nro.: '+this.state.ot.nroorden);
       // var dias = this.state.ot.diasentaller;
        //console.log('Días en taller: '+dias.toString());
        console.log(this.state.ot);      

    };

    render() { 
        var color='';

        if(this.state.ot.diasentaller <=1 ) color='pendiente';
        if(this.state.ot.diasentaller ===2 ) color='atencion';
        if(this.state.ot.diasentaller >2 ) color='critico';
        if(this.state.ot.estado==='TERMINADO' && this.state.ot.horasterminado <= 24 ) color='terminado';
        if(this.state.ot.estado==='TERMINADO' && this.state.ot.horasterminado > 24 &&  this.state.ot.horasterminado <= 72) color='atencion';
        if(this.state.ot.estado==='TERMINADO' && this.state.ot.horasterminado > 72 ) color='critico';

        if(color===null) color = 'pendiente';
        var clases = 'span '+color;

        const PopupExample = () => (
            <Popup trigger={<button style={{backgroundColor:'transparent',borderColor:'transparent'}} 
            >
                <img src={iconPreview}/></button>} >
                {close => (
                    <div className="modalpopup" >
                        <div className="header">
                            Orden Nro: {this.state.ot.nroorden} ({this.state.ot.situacion})
                        </div>
                        <div className="content">
                            <div>Sucursal: {this.state.ot.sucursal}</div>
                            <div>Asesor: {this.state.ot.asesor}</div>
                            <div>Cliente: {this.state.ot.cliente}</div>
                            <div>Apertura: {this.state.ot.apertura}</div>
                            <div>Dias En Taller: {this.state.ot.diasentaller}</div>
                            <div>Marca: {this.state.ot.marca}</div>
                            <div>Vehículo {this.state.ot.marcmodever}</div>
                            <div>Chasis: {this.state.ot.chasis}</div>
                            <div>Chapa: {this.state.ot.chapa}</div>
                            <div>Tipo Servicio: {this.state.ot.tiposervicio}</div>
                            <div>Estado: {this.state.ot.estado}</div>
                            <div>Fecha Terminado: {this.state.ot.fechaterminado}</div>
                            <div>Hora Terminado: {this.state.ot.horasterminado}</div>
                        </div>
                        <div className="close">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                        </div>
                    </div>
                )}

            </Popup>
          );

        return ( 
            <React.Fragment>
                <span className={clases}>
                    
                    <PopupExample>
                    </PopupExample>
                    
                </span>               

            </React.Fragment>
         );
    }
}
 
export default Orden;
