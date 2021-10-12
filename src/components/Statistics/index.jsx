import React, { Component } from "react";
import Chart from "react-apexcharts";
import DATOS2 from './../../datos2.json';
import { Container, Col, Row, Card } from 'react-bootstrap';
import OrdenesServices from '../../services/OrdenesServices';
import Select from 'react-select';

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            error: null,
            pantallalista: false,
            primeraVez: true,
            sucursalSelected:'*',
            listadodesucursales: [],

            options: {
                chart: {
                    height: 500,
                    type: 'line',
                    dropShadow: {
                        enabled: true,
                        color: '#000',
                        top: 18,
                        left: 7,
                        blur: 10,
                        opacity: 0.2
                    },
                    toolbar: {
                        show: false
                    }
                },
                colors: ['#77B6EA', '#545454', '#684E28'],
                dataLabels: {
                    enabled: true,
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: 'Movimiento de E/S vehículos Taller',
                    align: 'left'
                },
                grid: {
                    borderColor: '#e7e7e7',
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                markers: {
                    size: 1
                },
                xaxis: {
                    categories: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                    title: {
                        text: 'Días'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Aperturadas'
                    },
                    min: 0,
                    max: 70
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true,
                    offsetY: -25,
                    offsetX: -5
                }
            },
        }
    }
    
    componentDidMount() {
        this.setState({ isLoading: false });
        this.getResumen();

        this.setState({
            pantallalista: true,
            primeraVez: false,
        })
    }

    componentWillUpdate(nextProps,nextState){
        console.info('componentWillUpdate');
        if(this.state.sucursalSelected !== nextState.sucursalSelected){
            this.setState({
                sucursalSelected: nextState.sucursalSelected,
            })
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

    getResumen() {
        OrdenesServices.getResumenESOrdenes()
            .then(
                result => {

                    console.log("getResumen => OrdenesServices.getResumenESOrdenes", result);
                   
                    //Cargando la lista de Sucursales de manera dinámica
                //solo las sucursales que figuran en el listado general

                const lista_sucursales = result.map((o) => {
                    return o.sucursal;
                });
        
                let sinRepetidosSucursales = lista_sucursales.filter(
                    (valor,indiceActual,lista_sucursales) => lista_sucursales.indexOf(valor) === indiceActual);
                // sinRepetidosSucursales.unshift('*');

                    this.setState({
                        isLoading: true,
                        data: result,
                        listadodesucursales: sinRepetidosSucursales,
                    }) 
                }
            ).catch(
                err => {
                    console.log("getResumen => OrdenesServices.getResumenESOrdenes ERROR: ", err);
                }
            )
    }


    render() {        

        if (this.state.error) {
            return <p>{this.state.error.message}</p>
        }

        if (!this.state.isLoading) {
            return <p>Loading...</p>
        }

        console.log("getResumen => OrdenesServices.getResumenESOrdenes", this.state.data);
                
        const Sucursales = this.state.listadodesucursales.map((o) => {
            // if (o === "*") return { label: "ELIJA SUCURSAL", value: o };
            return { label: o, value: o };
        }); 

        const Grafico = ({_datos}) => {
            
            var entradas = [];
            var salidascw = [];
            var salidaspw = [];
            var totalingresos = 0, totalegresoscw = 0, totalegresospw = 0;
            
            var ordenes = _datos.filter(x => x.sucursal.includes(this.state.sucursalSelected));
            
            var xxx = ordenes.filter(x => x.type.includes('entries'));
            var yyy = ordenes.filter(x => x.type === 'outputs_cw');
            var zzz = ordenes.filter(x => x.type === 'outputs_pw');
            
            console.log('xxx', xxx);
            console.log('yyy', yyy);
            console.log('zzz', zzz);
    
            
            xxx.forEach(function (elemento, indice, array) {
                entradas.push(elemento.count);
                totalingresos += parseInt(elemento.count);
            });
    
            yyy.forEach(function (elemento, indice, array) {
                salidascw.push(elemento.count);
                totalegresoscw += parseInt(elemento.count);
            });
    
            zzz.forEach(function (elemento, indice, array) {
                salidaspw.push(elemento.count);
                totalegresospw += parseInt(elemento.count);
            });
    
            console.log("entradas", entradas);
            console.log("salidas cw", salidascw);
            console.log("salidas pw", salidaspw);
            console.log("Total Ingresos EgresosCW EgresosPW", totalingresos, totalegresoscw, totalegresospw);
    
            var series = [
                {
                    name: "Entradas",
                    data: entradas
                },
                {
                    name: "SalidasCW",
                    data: salidascw
                },
                {
                    name: "SalidasPW",
                    data: salidaspw
                }
            ];

            return(
                <Container
                    style={{
                        width: "100%",
                        marginTop: "1rem",
                        background: "#F7F8F9"
                    }}>
                    <Row sm={12}>

                        
                        <Col sm={8}>
                            {/* <div className="col-md-1">Sucursal: </div> */}
                            <div className="col-md-4">
                                <Select options={Sucursales} onChange={(valor) => {
                                    this.setState({sucursalSelected:valor.value}) //cambio el estado de sucursalSelected por el elegido
                                }}/>
                            </div>
                            <div className="mixed-chart">
                                <Chart
                                    options={this.state.options}
                                    series={series}
                                    type="line"
                                    width="100%"
                                />
                            </div>
                        </Col>

                        <Col sm={4}>
                            <Card className="card-body"
                                style={{
                                    width: "100%",
                                    marginTop: "1rem",
                                    background: "#E0E6EA"
                                }}>
                                <Card.Title style={{ color: "#1172B1" }} >Balance</Card.Title>
                                <Card.Text style={{ color: "#1172B1" }} >
                                    <div className="flex-row">
                                        <p>Entradas: {totalingresos}</p>
                                    </div>
                                    <div className="flex-row">
                                        <p>Salidas Sem. Actual: {totalegresoscw}</p>
                                    </div>
                                    <div className="flex-row">
                                        <p>Salidas Sem. Anteriores: {totalegresospw}</p>
                                    </div>
                                    <div className="flex-row">
                                        <p>Saldo Sem. Actual: {totalingresos - totalegresoscw}</p>
                                    </div>
                                    <div className="flex-row">
                                        <p>Saldo Sem. Anteriores: {totalingresos -
                                            (totalegresoscw + totalegresospw)}</p>
                                    </div>
                                </Card.Text>

                            </Card>
                        </Col>
                    </Row>
                </Container>
            );
        }
        
        return(
            <Grafico _datos={this.state.data}></Grafico>
        );
    }
}

export default Statistics;