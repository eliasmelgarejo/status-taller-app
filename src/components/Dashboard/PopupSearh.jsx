import React from 'react';
import Popup from 'reactjs-popup';

const PopupSearch = ({ searchot }) => {
    
    return(
        <React.Fragment>
            <Popup trigger={<button style={{backgroundColor:'transparent',borderColor:'transparent'}}></button>} position="center left">
                {close => (
                    <div className="modalpopup" >
                        <div className="header">
                            Orden Nro: {searchot.nroorden} ({searchot.situacion})
                        </div>
                        <div className="content">
                            <div>Sucursal: {searchot.sucursal}</div>
                            <div>Asesor: {searchot.asesor}</div>
                            <div>Cliente: {searchot.cliente}</div>
                            <div>Apertura: {searchot.apertura}</div>
                            <div>Dias En Taller: {searchot.diasentaller}</div>
                            <div>Marca: {searchot.marca}</div>
                            <div>Vehículo {searchot.marcmodever}</div>
                            <div>Chasis: {searchot.chasis}</div>
                            <div>Tipo Servicio: {searchot.tiposervicio}</div>
                            <div>Estado: {searchot.estado}</div>
                            <div>Fecha Terminado: {searchot.fechaterminado}</div>
                            <div>Hora Terminado: {searchot.horasterminado}</div>
                        </div>
                        <div className="close">
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                        </div>
                    </div>
                )}

            </Popup>
        </React.Fragment>

    );
}

export default PopupSearch;