import React from 'react';
import Popup from 'reactjs-popup';
import iconSearch from './assets/search_find_24.png';
import './style.css';

const PopupSearch = ({searchot,encontrado}) => {

    if(encontrado === false ){
        return(
            <React.Fragment>
                <Popup popperModifiers={{
                    preventOverflow: {
                      boundariesElement: "offsetParent"
                    }
                  }}
                trigger={<button> 
                    <img src={iconSearch}/></button>} >
                    {close => (
                        <div className="modalpopup" >
                            <div className="header">
                                Orden Nro: -
                            </div>
                            <div className="content">
                                <div>Sucursal: - </div>
                                <div>Asesor: - </div>
                                <div>Cliente: - </div>
                                <div>Apertura: - </div>
                                <div>Dias En Taller: - </div>
                                <div>Marca: - </div>
                                <div>Vehículo - </div>
                                <div>Chasis: - </div>
                                <div>Chapa: - </div>
                                <div>Tipo Servicio: - </div>
                                <div>Estado: - </div>
                                <div>Fecha Terminado: - </div>
                                <div>Hora Terminado: - </div>
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
    }else{
        return(
            <React.Fragment>
                <Popup popperModifiers={{
                    preventOverflow: {
                      boundariesElement: "offsetParent"
                    }
                  }}
                trigger={<button> 
                    <img src={iconSearch}/></button>} >
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
                                <div>Chapa: {searchot.chapa}</div>
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

    
}

export default PopupSearch;