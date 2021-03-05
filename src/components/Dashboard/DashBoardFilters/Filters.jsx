import React, { Component } from 'react';
import Select from 'react-select';


const Asesores = [
    { label: "PACUA ORTIZ, RAUL MARCELO", value: "PACUA ORTIZ, RAUL MARCELO" },
    { label: "CUBILLA, CARLOS", value: "CUBILLA, CARLOS" },
    { label: "DIAZ VILLALBA, LETICIA", value: "DIAZ VILLALBA, LETICIA" },
    { label: "DORIS FRANCO", value: "DORIS FRANCO" },
    { label: "CORONEL PEREIRA, GUSTAVO ADOLFO", value: "CORONEL PEREIRA, GUSTAVO ADOLFO" },
    { label: "ASESOR VENTAS INTERNAS", value: "ASESOR VENTAS INTERNAS" },
    { label: "ASESOR TALLERES AUTORIZADOS", value: "ASESOR TALLERES AUTORIZADOS" }
  ];

const Marcas = [
    { label: "SUZUKI", value: "SUZUKI" },
    { label: "SSANG YONG", value: "SSANG YONG" },
    { label: "FOTON", value: "FOTON" },
    { label: "LIFAN", value: "LIFAN"},
    { label: "MG", value: "MG"},
    { label: "SOLIS", value: "SOLIS"}
];

const FiltroComponent = ()=>{
    return(
        <div className="container">
        <div className="row">
            <div className="col-md-2">Asesor: </div>
            <div className="col-md-4">
            <Select options={Asesores} />
            </div>
            <div className="col-md-2">Marca: </div>
            <div className="col-md-4">
            <Select options={Marcas}/>
            </div>
        </div>
        <span></span>
      </div>
    );
};

export default FiltroComponent;