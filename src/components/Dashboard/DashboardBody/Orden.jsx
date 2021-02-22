import React, { Component } from 'react';
import myImage from './baseline_preview_black_18dp.png';
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

        if(this.state.ot.diasentaller===1) color='pendiente';
        if(this.state.ot.diasentaller===2) color='atencion';
        if(this.state.ot.diasentaller>2) color='critico';
        if(this.state.ot.estado==='TERMINADO' && this.state.ot.horasterminado <= 72 ) color='terminado';
        if(this.state.ot.estado==='TERMINADO' && this.state.ot.horasterminado > 72 &&  this.state.ot.horasterminado <= 168) color='atencion';
        if(this.state.ot.estado==='TERMINADO' && this.state.ot.horasterminado > 168 ) color='critico';

        var clases = 'span '+color;

        const PopupExample = () => (
            <Popup trigger={<button style={{backgroundColor:'transparent',borderColor:'transparent'}} 
            onClick={this.onDetails}><img src={myImage}/></button>} position="top left">
                {close => (
                    <div className="modalpopup" >
                        <div className="header">
                            Orden Nro: {this.state.ot.nroorden}
                        </div>
                        <div className="content">
                            <div>Cliente: {this.state.ot.cliente}</div>
                            <div>Asesor: {this.state.ot.asesor}</div>
                            <div>Apertura: {this.state.ot.apertura}</div>
                            <div>Dias En Taller: {this.state.ot.diasentaller}</div>
                            <div>Vehículo {this.state.ot.marcmodever}</div>
                            <div>Chasis: {this.state.ot.chasis}</div>
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
