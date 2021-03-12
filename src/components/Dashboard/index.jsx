import React, { Component } from "react";
//import OrdenListing from './OrdenListing';
import DashboardHeader from './DashboardHeader/index';
// import DashboardBody from './DashboardBody';
// import DashboardBody2 from './DashboardBody2';
import Orden from './DashboardBody/Orden';
import Select from 'react-select';
import './style.css';
import Datos from './../../datos.json';
import iconSearch from './assets/search_find_24.png';
import iconExcel from './assets/excel_social_24.png';
import PopupSearch from './PopupSearh';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

//url del api del sti hecho en spring
const url_base_sti = "http://10.0.10.120:8090/api";

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: false,
            error: null,
            asesorSelected: '*',
            marcaSelected: '*',
            sucursalSelected: '*',
        };
    }

    componentDidMount() {

        this.setState({ isLoading: false });
        this._getDataAPI();
    }

    _getDataAPI() {
            this.setState({
                data: Datos,
                isLoading: true,
                _cantidad_mec: Datos.filter(orden => orden.seccion !== 'CYP').length,
                _cantidad_cyp: Datos.filter(orden => orden.seccion === 'CYP').length,
            });

        // var ordenes_uri = '/ordenes';

        // fetch(url_base_sti + ordenes_uri)
        // .then(response => response.json())
        // .then(result => {
        //     console.log('Dashboard Respuesta de fetch result', result);
        //     this.setState({
        //         ordenes: result,
        //         isLoading: true,
        //         _cantidad_mec: result.filter(orden => orden.seccion !== 'CYP').length,
        //         _cantidad_cyp: result.filter(orden => orden.seccion === 'CYP').length,
        //     });
        // })
        // .catch(error => {
        //     this.setState({ error: error.message });
        //     console.error({ error, isLoading: false });
        // });
    }

    componentWillUpdate(nextProps,nextState){
        console.log('Dashboard2 componentWillUpdate');
        console.log('this.state.asesorSelected',this.state.asesorSelected);
        console.log('nextState.asesorSelected',nextState.asesorSelected);

        if(this.state.asesorSelected !== nextState.asesorSelected){
            this.setState({
                asesorSelected: nextState.asesorSelected,
            });
        }       
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log('Dashboard2 shouldComponentUpdate');
        if(nextState.data.length > 0) {
            console.log('return true');            
            return true;
        }
        console.log('return false');
        return false;        
    }
    
    handleClick = () => {
        return (
            <ExcelFile>
                <ExcelSheet data={Datos} name="Status Taller">
                    <ExcelColumn label="Sucursal" value="sucursal"/>
                    <ExcelColumn label="Seccion" value="seccion"/>
                    <ExcelColumn label="Asesor Money" value="asesor"/>
                    <ExcelColumn label="Orden" value="nroorden"/>
                    <ExcelColumn label="Apertura" value="apertura"/>
                    <ExcelColumn label="Chasis" value="chasis"/>
                    <ExcelColumn label="Marca" value="marca"/>
                    <ExcelColumn label="Tipo Servicio" value="tiposervicio"/>
                    <ExcelColumn label="Dias Taller" value="diasentaller"/>
                    <ExcelColumn label="Fecha Terminado" value="fechaterminado"/>
                    <ExcelColumn label="Dia Terminado" value="horasterminado"/>
                    <ExcelColumn label="ConTrabajos" value="contrabajos"/>
                    <ExcelColumn label="MoCargadas" value="mocargadas"/>
                    <ExcelColumn label="Temrinados" value="terminados"/>
                    <ExcelColumn label="Salida" value="salida"/>
                    <ExcelColumn label="Situacion" value="situacion"/>
                    <ExcelColumn label="Estado" value="estado"/>
                </ExcelSheet>
                
            </ExcelFile>
        );
    }
    // handleClick(){
    //     alert('Hello Events!!');
    // }
      

    handleSearhData = () =>{
        var p_ot;
        var p_ot_lista = Datos;
        p_ot = p_ot_lista.find(orden => orden.nroorden === "375173" || orden.chasis === "375173");
        console.log(p_ot);        
        return <PopupSearch searchot={p_ot}></PopupSearch>
    };

    render() {


        if (this.setState.error) {
            return <p>{this.state.error.message}</p>
        }

        if (!this.state.isLoading) {
            return <p>Loading...</p>
        }

        const DashboardBody2 = ({_ordenes_asesor}) => {
            var filtradas = null;
            var _mec_pendientes = null,_mec_proceso = null,_mec_terminados = null,
            _cyp_pendientes = null,_cyp_proceso = null,_cyp_terminados = null;
        
            filtradas = _ordenes_asesor;  
            
            //lista de mec 
            _mec_pendientes = filtradas.filter(orden => orden.seccion !== 'CYP' && orden.estado==='PENDIENTE');
            _mec_proceso = filtradas.filter(orden => orden.seccion !== 'CYP' && orden.estado==='PROCESO');
            _mec_terminados = filtradas.filter(orden => orden.seccion !== 'CYP' && orden.estado==='TERMINADO');
            //lista de cyp
            _cyp_pendientes = filtradas.filter(orden => orden.seccion === 'CYP' && orden.estado==='PENDIENTE');
            _cyp_proceso = filtradas.filter(orden => orden.seccion === 'CYP' && orden.estado==='PROCESO');
            _cyp_terminados = filtradas.filter(orden => orden.seccion === 'CYP' && orden.estado==='TERMINADO');
        
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
        
                        <div className="text-danger"> Pendientes - {_mec_pendientes.length} </div>
                        <div className='areaComponent redComponent '>
                            {_mec_pendientes.map(orden => <Orden id={orden.nroorden} ot={orden}></Orden>)}
                        </div>
        
                        <div className="text-success"> Con Trabajos - {_mec_proceso.length}  </div>
                        <div className='areaComponent greenComponent'>
                            {_mec_proceso.map(orden => <Orden ot={orden}></Orden>)}
                        </div>
        
                        <div className="text-info"> Terminados - {_mec_terminados.length} </div>
                        <div className='areaComponent blueComponent'>
                            {_mec_terminados.map(orden => <Orden ot={orden}></Orden>)}
                        </div>
        
                    </div>
                    <div className='column align-self-start col-12 col-md-6 col-xl-6'>
        
                        <div className="text-danger"> Pendientes - {_cyp_pendientes.length} </div>
                        <div className='areaComponent redComponent '>
                            {_cyp_pendientes.map(orden => <Orden ot={orden}></Orden>)}
                        </div>
        
                        <div className="text-success"> Con Trabajos - {_cyp_proceso.length} </div>
                        <div className='areaComponent greenComponent'>
                            {_cyp_proceso.map(orden => <Orden ot={orden}></Orden>)}
                        </div>
        
                        <div className="text-info"> Terminados - {_cyp_terminados.length} </div>
                        <div className='areaComponent blueComponent'>
                            {_cyp_terminados.map(orden => <Orden ot={orden}></Orden>)}
                        </div>
        
                    </div>                
                </div>
             );
        }


        //Carganmdo la lista de Asesores de manera dinámica
        //solo los Asesores que figuran en el listado general
        const lista = this.state.data.map((orden)=>{
            return orden.asesor;
        });

        const aux_marcas = this.state.data.map((orden)=>{
            return orden.marca;
        });
        
        let sinRepetidos = lista.filter((valor, indiceActual, lista) => lista.indexOf(valor) === indiceActual);
        sinRepetidos.push('*');

        let sinRepetidosMarcas = aux_marcas.filter((valor,indiceActual, aux_marcas) => aux_marcas.indexOf(valor) === indiceActual);
        sinRepetidosMarcas.push('*');

        const Sucursales = [
            {label: "CASA CENTRAL", value: "CASA CENTRAL"},
            {label: "PDI MRA", value: "PDI MRA"},
            {label: "CDE", value: "CDE"},
            {label: "ENCARNACION", value: "ENCARNACION"},
            {label: "MOTOS", value: "MOTOS"},
        ]
        
        const Asesores = sinRepetidos.map((o)=>{
            if(o==="*") return {label:"TODOS",value:o};
            return {label:o,value:o};
        });
        
        const Marcas = sinRepetidosMarcas.map((o)=>{
            if(o==='*') return {label:'TODOS',value:o};
            return {label:o,value:o};
        });          
        

        var ordenes_asesor,ordenes_mec,ordenes_cyp;

        if(this.state.asesorSelected !== '*' && this.state.marcaSelected !== '*') {
            
            ordenes_mec = this.state.data.filter(orden => orden.seccion !== 'CYP' 
                && orden.asesor === this.state.asesorSelected
                && orden.marca === this.state.marcaSelected);
            
            ordenes_cyp = this.state.data.filter(orden => orden.seccion === 'CYP' 
                && orden.asesor === this.state.asesorSelected
                && orden.marca === this.state.marcaSelected);

            ordenes_asesor = this.state.data.filter(orden => orden.asesor === this.state.asesorSelected
            && orden.marca === this.state.marcaSelected);            
        }
        else if(this.state.asesorSelected !== '*' && this.state.marcaSelected === '*')
        {
            //FILTRO: Asesor: Seleccionado y Marca: TODOS
            ordenes_mec = this.state.data.filter(orden => orden.seccion !== 'CYP' 
                && orden.asesor === this.state.asesorSelected);
            ordenes_cyp = this.state.data.filter(orden => orden.seccion === 'CYP' 
                && orden.asesor === this.state.asesorSelected);
            
            ordenes_asesor = this.state.data.filter(orden => orden.asesor === this.state.asesorSelected);            
        }
        else if(this.state.asesorSelected === '*' && this.state.marcaSelected !== '*')
        {
            //FILTRO: Asesor: TODOS y Marca: Seleccionada
            ordenes_mec = this.state.data.filter(orden => orden.seccion !== 'CYP' 
                && orden.marca === this.state.marcaSelected);
            ordenes_cyp = this.state.data.filter(orden => orden.seccion === 'CYP' 
                && orden.marca === this.state.marcaSelected);

            ordenes_asesor = this.state.data.filter(orden => orden.marca === this.state.marcaSelected);            
        }
        else if(this.state.asesorSelected === '*' && this.state.marcaSelected === '*')
        {
            //FILTRO: Asesor: TODOS y Marca: TODOS
            ordenes_mec = this.state.data.filter(orden => orden.seccion !== 'CYP');
            ordenes_cyp = this.state.data.filter(orden => orden.seccion === 'CYP');

            ordenes_asesor = this.state.data;
        }
        console.log('###############################################################################');
        console.log("FILTRO: Asesor: "+this.state.asesorSelected+" y Marca:"+ this.state.marcaSelected);
        console.log('MEC CANTIDAD: ' + ordenes_mec.length +' CYP CANTIDAD: ' + ordenes_cyp.length);
        console.log('this.state.ordenes',this.state.ordenes);
        console.log('ordenes_asesor',ordenes_asesor);
        console.log('###############################################################################');

        return (            
            <div>
                <div className="row">                
                    <div className="col-md-1">Sucursal: </div>
                    <div className="col-md-2">
                        <Select options={Sucursales} onChange={(valor) => {
                            this.setState({sucursalSelected:valor.value}) //cambio el estado de sucursalSelected por el elegido
                        }}/>
                    </div>
                    <div className="col-md-1">Asesor: </div>
                    <div className="col-md-2">
                        <Select options={Asesores} onChange={(valor) => {
                            this.setState({asesorSelected:valor.value}) //cambio el estado de asesorSelected por el elegido
                        }}/>
                    </div>
                    <div className="col-md-1">
                        <text>Marca:</text>                      
                    </div>
                    <div className="col-md-2">
                        <Select options={Marcas} onChange={(valor) =>{
                            this.setState({marcaSelected:valor.value})  //cambio el estado de marcaSelected por el elegido
                        }} />
                    </div>
                    <div className="col-md-3">
                        <div className="row">

                            <input id="searhInput" onChange={(valor) =>{
                                this.setState({searh: valor})
                            }} placeholder="Nro. OT | Chapa | Chasis"/> 
                            <button onClick={e => this.handleSearhData(e)}><img src={iconSearch}/></button>
                            <button onClick={e => this.handleClick(e) }><img src={iconExcel}/></button>

                        </div>
                    </div>
                        
                </div>             
                <DashboardHeader hcantidad_mec={ordenes_mec.length} hcantidad_cyp={ordenes_cyp.length} ></DashboardHeader>
                <DashboardBody2 _ordenes_asesor={ordenes_asesor} ></DashboardBody2>
            </div>
        );        
    }
    
}

export default Dashboard;