import React, { Component } from "react";
import DashboardHeader from './DashboardHeader/index';
import Orden from './DashboardBody/Orden';
import Select from 'react-select';
import './style.css';
import Datos from './../../datos.json';//datos de prueba
import iconExcel from './assets/excel_social_24.png';
import PopupSearch from './PopupSearh';
import ReactExport from "react-data-export";
import OrdenesServices from '../../services/OrdenesServices';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: false,
            error: null,
            asesorSelected: '*',
            marcaSelected: '*',
            sucursalSelected: 'CR CENSER',
            prioridadSelected: '*',
            parameterSearch: null,
            parameterEncontrado: false,
            pantallalista: false,
            primeraVez: true,
        };
    }

    componentDidMount() {

        this.setState({ isLoading: false });
        //this._getDataAPI2();
        this.getOrdenes();
        console.log('componentDidMount....');
        
        console.log('console.info(this.state.data.indexOf(0));');
        console.info(this.state.data.indexOf(0));

        this.setState({
            parameterSearch: this.state.data.indexOf(0),
            pantallalista: true,
        })
    }

    //solo para datos de prueba no usar en producción
    _getDataAPI2() {
        this.setState({
            data: Datos,
            isLoading: true,
            _cantidad_mec: Datos.filter(orden => orden.seccion !== 'CYP').length,
            _cantidad_cyp: Datos.filter(orden => orden.seccion === 'CYP').length,
        });

    }

    getOrdenes() {
        OrdenesServices.getOrdenesSinSalida()
            .then(
                result => {
                    console.log('getOrdenes OrdenesServices.getOrdenesSinSalida...', result);
                    this.setState({
                        data: result,
                        isLoading: true,
                        _cantidad_mec: result.filter(orden => orden.seccion !== 'CYP').length,
                        _cantidad_cyp: result.filter(orden => orden.seccion === 'CYP').length,
                    });
                }
            )
            .catch(err => {
                this.setState({
                    error: err.message,
                    isLoading: false
                });
            })
    }

    getOrdenesPorSucursal(sucursal) {
        OrdenesServices.getOrdenesPorSucursal(sucursal)
            .then(
                result => {
                    console.log('getOrdenes OrdenesServices.getOrdenesPorSucursal...', result);
                    this.setState({
                        data: result,
                        isLoading: true,
                        _cantidad_mec: result.filter(orden => orden.seccion !== 'CYP').length,
                        _cantidad_cyp: result.filter(orden => orden.seccion === 'CYP').length,
                    });
                }
            )
            .catch(err => {
                this.setState({
                    error: err.message,
                    isLoading: false
                });
            })
    }
   

    componentWillUpdate(nextProps, nextState) {
        console.log('Dashboard2 componentWillUpdate');
        console.log('this.state.asesorSelected', this.state.asesorSelected);
        console.log('nextState.asesorSelected', nextState.asesorSelected);

        console.log('this.state.sucursalSelected', this.state.sucursalSelected);
        console.log('nextState.sucursalSelected', nextState.sucursalSelected);

        if (this.state.asesorSelected !== nextState.asesorSelected) {
            this.setState({
                asesorSelected: nextState.asesorSelected,
            });
        }
        if (this.state.marcaSelected !== nextState.marcaSelected) {
            this.setState({
                marcaSelected: nextState.marcaSelected,
            });
        }
        if (this.state.prioridadSelected !== nextState.prioridadSelected) {
            this.setState({
                prioridadSelected: nextState.prioridadSelected,
            });
        }
        if(this.state.sucursalSelected !== nextState.sucursalSelected) {
            this.setState({
                sucursalSelected: nextState.sucursalSelected,
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Dashboard shouldComponentUpdate');
        if (nextState.data.length > 0) {
            console.log('shouldComponentUpdate return true');
            return true;
        }
        console.log('shouldComponentUpdate return false');
        return false;
    }

    handleSearhData = (e) => {
        e.preventDefault();
        const { evento, target } = e

        const listadeordenes = this.state.data.map((orden) => {
            return orden.nroorden;
        });
        const listadechasis = this.state.data.map((orden) => {
            return orden.chasis;
        });
        const listadechapas = this.state.data.map((orden) => {
            return orden.chapa;
        });

        if ((listadeordenes.includes(target.value.toUpperCase())
            || listadechasis.includes(target.value.toUpperCase())
            || listadechapas.includes(target.value.toUpperCase()))
            && this.state.pantallalista === true) {

            console.log(target.value);

            console.log('MyArray Includes NRO ORDEN');
            console.info('Encontre Orden o Chasis o Chapa', listadeordenes.includes(target.value.toUpperCase()),
                listadechasis.includes(target.value.toUpperCase()), listadechapas.includes(target.value.toUpperCase()));

            var p_ot;
            p_ot = this.state.data.find(orden => orden.nroorden === target.value.toUpperCase()
                || orden.chasis === target.value.toUpperCase()
                || orden.chapa === target.value.toUpperCase());

            this.setState({
                parameterSearch: p_ot,
                parameterEncontrado: true,
            });
        } else {
            if (this.state.primeraVez === false) {
                alert('Registro no encontrado!', target.value);

                this.setState({
                    parameterEncontrado: false,
                });
            } else {
                this.setState({
                    primeraVez: false,
                });
            }
        }
    };

    render() {

        if (this.state.error) {
            return <p>{this.state.error.message}</p>
        }

        if (!this.state.isLoading) {
            return <p>Loading...</p>
        }

        const DashboardBody2 = ({ _ordenes_asesor }) => {
            var filtradas = null;
            var _mec_pendientes = null, _mec_proceso = null, _mec_terminados = null,
                _cyp_pendientes = null, _cyp_proceso = null, _cyp_terminados = null;

            filtradas = _ordenes_asesor;

            //lista de mec 
            _mec_pendientes = filtradas.filter(orden => orden.seccion !== 'CYP' && orden.estado === 'PENDIENTE' && orden.sucursal === this.state.sucursalSelected);
            _mec_proceso = filtradas.filter(orden => orden.seccion !== 'CYP' && orden.estado === 'PROCESO' && orden.sucursal === this.state.sucursalSelected);
            _mec_terminados = filtradas.filter(orden => orden.seccion !== 'CYP' && orden.estado === 'TERMINADO' && orden.sucursal === this.state.sucursalSelected);
            //lista de cyp
            _cyp_pendientes = filtradas.filter(orden => orden.seccion === 'CYP' && orden.estado === 'PENDIENTE' && orden.sucursal === this.state.sucursalSelected);
            _cyp_proceso = filtradas.filter(orden => orden.seccion === 'CYP' && orden.estado === 'PROCESO' && orden.sucursal === this.state.sucursalSelected);
            _cyp_terminados = filtradas.filter(orden => orden.seccion === 'CYP' && orden.estado === 'TERMINADO' && orden.sucursal === this.state.sucursalSelected);

            return (
                <div className='row'>
                    <div className='column align-self-start col-12 col-md-6 col-xl-6'>

                        <div className="text-danger"> Pendientes - {_mec_pendientes.length} </div>
                        <div className='areaComponent redComponent '>
                            {_mec_pendientes.map(orden => <Orden ot={orden}></Orden>)}
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

        //Cargando la lista de Sucursales de manera dinámica
        //solo las sucursales que figuran en el listado general
        const lista_sucursales = this.state.data.map((orden) => {
            return orden.sucursal;
        });

        //Carganmdo la lista de Asesores de manera dinámica
        //solo los Asesores que figuran en el listado general
        const lista = this.state.data.map((orden) => {
            return orden.asesor;
        });

        const aux_marcas = this.state.data.map((orden) => {
            return orden.marca;
        });

        let sinRepetidos = lista.filter((valor, indiceActual, lista) => lista.indexOf(valor) === indiceActual);
        sinRepetidos.unshift('*');

        let sinRepetidosMarcas = aux_marcas.filter((valor, indiceActual, aux_marcas) => aux_marcas.indexOf(valor) === indiceActual);
        sinRepetidosMarcas.unshift('*');

        let sinRepetidosSucursales = lista_sucursales.filter((valor,indiceActual,lista_sucursales) => lista_sucursales.indexOf(valor) === indiceActual);
        // sinRepetidosSucursales.unshift('*');

        const Prioritarios = [
            { label: "TODOS", value: "*" },
            { label: "PRIORITARIO", value: "SI" },
            { label: "NORMAL", value: "NO" },
        ]
             
        // console.log('this.state.sucursal #####');
        // console.info(this.state.sucursal);

        const Sucursales = sinRepetidosSucursales.map((o) => {
            if (o === "*") return { label: "TODOS", value: o };
            return { label: o, value: o };
        });
              

        const Asesores = sinRepetidos.map((o) => {
            if (o === "*") return { label: "TODOS", value: o };
            return { label: o, value: o };
        });

        const Marcas = sinRepetidosMarcas.map((o) => {
            if (o === '*') return { label: 'TODOS', value: o };
            return { label: o, value: o };
        });


        var ordenes_asesor, ordenes_mec, ordenes_cyp;

        if (this.state.asesorSelected !== '*' && this.state.marcaSelected !== '*' 
        && this.state.prioridadSelected !== '*' && this.state.sucursalSelected !== '*') {
            //FILTRO:000 Asesor: !*, Marca: !*, Prioridad: !* y Sucursal: !*
            ordenes_mec = this.state.data.filter(orden => orden.seccion !== 'CYP'
                && orden.asesor === this.state.asesorSelected
                && orden.marca === this.state.marcaSelected
                && orden.prioridad === this.state.prioridadSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_cyp = this.state.data.filter(orden => orden.seccion === 'CYP'
                && orden.asesor === this.state.asesorSelected
                && orden.marca === this.state.marcaSelected
                && orden.prioridad === this.state.prioridadSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_asesor = this.state.data.filter(orden => orden.asesor === this.state.asesorSelected
                && orden.marca === this.state.marcaSelected
                && orden.prioridad === this.state.prioridadSelected
                && orden.sucursal === this.state.sucursalSelected);
        }
        else if (this.state.asesorSelected !== '*' && this.state.marcaSelected !== '*' 
        && this.state.prioridadSelected === '*' && this.state.sucursalSelected !== '*') {
            //FILTRO:001 Asesor: !*, Marca: !* y Prioridad: *
            ordenes_mec = this.state.data.filter(orden => orden.seccion !== 'CYP'
                && orden.asesor === this.state.asesorSelected
                && orden.marca === this.state.marcaSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_cyp = this.state.data.filter(orden => orden.seccion === 'CYP'
                && orden.asesor === this.state.asesorSelected
                && orden.marca === this.state.marcaSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_asesor = this.state.data.filter(orden => orden.asesor === this.state.asesorSelected
                && orden.marca === this.state.marcaSelected
                && orden.sucursal === this.state.sucursalSelected);
        }
        else if (this.state.asesorSelected !== '*' && this.state.marcaSelected === '*' 
        && this.state.prioridadSelected !== '*' && this.state.sucursalSelected !== '*') {
            //FILTRO:010 Asesor: !*, Marca: * y Prioridad: !*
            ordenes_mec = this.state.data.filter(orden => orden.seccion !== 'CYP'
                && orden.asesor === this.state.asesorSelected
                && orden.prioridad === this.state.prioridadSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_cyp = this.state.data.filter(orden => orden.seccion === 'CYP'
                && orden.asesor === this.state.asesorSelected
                && orden.prioridad === this.state.prioridadSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_asesor = this.state.data.filter(orden => orden.asesor === this.state.asesorSelected
                && orden.prioridad === this.state.prioridadSelected
                && orden.sucursal === this.state.sucursalSelected);
        }
        else if (this.state.asesorSelected !== '*' && this.state.marcaSelected === '*' 
        && this.state.prioridadSelected === '*' && this.state.sucursalSelected !== '*') {
            //FILTRO:011 Asesor: !*, Marca: * y Prioridad: *
            ordenes_mec = this.state.data.filter(orden => orden.seccion !== 'CYP'
                && orden.asesor === this.state.asesorSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_cyp = this.state.data.filter(orden => orden.seccion === 'CYP'
                && orden.asesor === this.state.asesorSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_asesor = this.state.data.filter(orden => orden.asesor === this.state.asesorSelected
                && orden.sucursal === this.state.sucursalSelected);
        }
        else if (this.state.asesorSelected === '*' && this.state.marcaSelected !== '*' 
        && this.state.prioridadSelected !== '*' && this.state.sucursalSelected !== '*') {
            //FILTRO:100 Asesor: *, Marca: !* y Prioridad: !*
            ordenes_mec = this.state.data.filter(orden => orden.seccion !== 'CYP'
                && orden.marca === this.state.marcaSelected
                && orden.prioridad === this.state.prioridadSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_cyp = this.state.data.filter(orden => orden.seccion === 'CYP'
                && orden.marca === this.state.marcaSelected
                && orden.prioridad === this.state.prioridadSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_asesor = this.state.data.filter(orden => orden.marca === this.state.marcaSelected
                && orden.prioridad === this.state.prioridadSelected
                && orden.sucursal === this.state.sucursalSelected);
        }
        else if (this.state.asesorSelected === '*' && this.state.marcaSelected !== '*' 
        && this.state.prioridadSelected === '*' && this.state.sucursalSelected !== '*') {
            //FILTRO:101 Asesor: *, Marca: !* y Prioridad: *
            ordenes_mec = this.state.data.filter(orden => orden.seccion !== 'CYP'
                && orden.marca === this.state.marcaSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_cyp = this.state.data.filter(orden => orden.seccion === 'CYP'
                && orden.marca === this.state.marcaSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_asesor = this.state.data.filter(orden => orden.marca === this.state.marcaSelectedv
                && orden.sucursal === this.state.sucursalSelected);
        }
        else if (this.state.asesorSelected === '*' && this.state.marcaSelected === '*' 
        && this.state.prioridadSelected !== '*' && this.state.sucursalSelected !== '*') {
            //FILTRO:110 Asesor: TODOS, Marca: TODOS y Prioridad: 
            ordenes_mec = this.state.data.filter(orden => orden.seccion !== 'CYP'
                && orden.prioridad === this.state.prioridadSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_cyp = this.state.data.filter(orden => orden.seccion === 'CYP'
                && orden.prioridad === this.state.prioridadSelected
                && orden.sucursal === this.state.sucursalSelected);

            ordenes_asesor = this.state.data.filter(orden => orden.prioridad === this.state.prioridadSelected
                && orden.sucursal === this.state.sucursalSelected);
        }
        else if (this.state.asesorSelected === '*' && this.state.marcaSelected === '*' 
        && this.state.prioridadSelected === '*' && this.state.sucursalSelected !== '*') {
            //FILTRO:111 Asesor: *, Marca: * y Prioridad: *
            ordenes_mec = this.state.data.filter(orden => orden.seccion !== 'CYP'
            && orden.sucursal === this.state.sucursalSelected);

            ordenes_cyp = this.state.data.filter(orden => orden.seccion === 'CYP'
            && orden.sucursal === this.state.sucursalSelected);

            ordenes_asesor = this.state.data;
        }


        console.info("SELECTED: ", this.state.sucursalSelected +','+ this.state.asesorSelected + ',' + this.state.marcaSelected + ',' + this.state.prioridadSelected);

        return (
            <div>
                <div className="row">

                    <div className="col-md-1">Prioridad: </div>
                    <div className="col-md-2">
                        <Select options={Prioritarios} defaultValue={Prioritarios.find(() => '*')} onChange={(valor) => {
                            this.setState({ prioridadSelected: valor.value }) //cambio el estado de sucursalSelected por el elegido
                        }} />
                    </div>

                    <div className="col-md-1">Sucursal: </div>
                    <div className="col-md-2">
                        <Select options={Sucursales} onChange={(valor) => {
                            this.setState({sucursalSelected:valor.value}) //cambio el estado de sucursalSelected por el elegido
                        }}/>
                    </div>

                    <div className="col-md-1">Asesor: </div>
                    <div className="col-md-2">
                        <Select options={Asesores} defaultValue={Asesores.find(() => '*')} onChange={(valor) => {
                            this.setState({ asesorSelected: valor.value }) //cambio el estado de asesorSelected por el elegido
                        }} />
                    </div>

                    <div className="col-md-1">
                        <text>Marca:</text>
                    </div>
                    <div className="col-md-2">
                        <Select options={Marcas} defaultValue={Marcas.find(() => '*')} onChange={(valor) => {
                            this.setState({ marcaSelected: valor.value })  //cambio el estado de marcaSelected por el elegido
                        }} />
                    </div>

                    <div className="col-md-3">
                        <input id="searhInput" onBlur={e => this.handleSearhData(e)} placeholder="Nro. OT | Chapa | Chasis" />

                        <PopupSearch searchot={this.state.parameterSearch} encontrado={this.state.parameterEncontrado}></PopupSearch>

                        <ExcelFile element={<button><img src={iconExcel} /></button>}>
                            <ExcelSheet data={this.state.data} name="Status Taller">
                                <ExcelColumn label="Sucursal" value="sucursal" />
                                <ExcelColumn label="Prioridad" value="prioridad" />
                                <ExcelColumn label="Seccion" value="seccion" />
                                <ExcelColumn label="Asesor Money" value="asesor" />
                                <ExcelColumn label="Orden" value="nroorden" />
                                <ExcelColumn label="Apertura" value="apertura" />
                                <ExcelColumn label="Chasis" value="chasis" />
                                <ExcelColumn label="Chapa" value="chapa" />
                                <ExcelColumn label="Marca" value="marca" />
                                <ExcelColumn label="Vehículo" value="marcmodever" />
                                <ExcelColumn label="Cliente" value="cliente" />
                                <ExcelColumn label="Tipo Servicio" value="tiposervicio" />
                                <ExcelColumn label="Dias Taller" value="diasentaller" />
                                <ExcelColumn label="Fecha Terminado" value="fechaterminado" />
                                <ExcelColumn label="Dias Terminado" value="horasterminado" />
                                <ExcelColumn label="Con Trabajos" value="contrabajos" />
                                <ExcelColumn label="Mo Cargadas" value="mocargadas" />
                                <ExcelColumn label="Temrinados" value="terminados" />
                                <ExcelColumn label="Salida" value="salida" />
                                <ExcelColumn label="Situacion" value="situacion" />
                                <ExcelColumn label="Estado" value="estado" />
                            </ExcelSheet>
                        </ExcelFile>
                    </div>
                </div>
                <DashboardHeader hcantidad_mec={ordenes_mec.length} hcantidad_cyp={ordenes_cyp.length} ></DashboardHeader>
                <DashboardBody2 _ordenes_asesor={ordenes_asesor} ></DashboardBody2>
            </div>
        );
    }

}

export default Dashboard;