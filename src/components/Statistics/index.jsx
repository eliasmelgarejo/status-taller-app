import React, { Component } from "react";
import Chart from "react-apexcharts";
import DATOS2 from './../../datos2.json';
import { Container, Col, Row, Card } from 'react-bootstrap';
import OrdenesServices from '../../services/OrdenesServices';

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isLoading: false,
            error: null,
            totalIngresos: 0,
            totalEgresoscw: 0,
            totalEgresospw: 0,
            series: [
                {
                    name: "Entradas",
                    data: []
                },
                {
                    name: "SalidasCW",
                    data: []
                },
                {
                    name: "SalidasPW",
                    data: []
                }
            ],

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
            colors: ['#77B6EA', '#545454','#684E28'],
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
    
    getResumen2(){
        var result=DATOS2;
        console.log("getResumen => OrdenesServices.getResumenESOrdenes",result);
        var xxx = result.filter(x=>x.type==='entries');
        var yyy = result.filter(x=>x.type==='outputs_cw');
        var zzz = result.filter(x =>x.type==='outputs_pw')
        
        console.log('xxx', xxx);
        console.log('yyy', yyy);
        console.log('zzz', zzz);

        var entradas=[];
        var salidascw = [];            
        var salidaspw = [];
        var _totalingresos=0,_totalegresoscw=0,_totalegresospw=0;
        
        xxx.forEach(function(elemento, indice, array) {
            entradas.push(elemento.count);
            _totalingresos += parseInt(elemento.count);
        });

        yyy.forEach(function(elemento, indice, array) {
            salidascw.push(elemento.count);
            _totalegresoscw += parseInt(elemento.count);
        });

        zzz.forEach(function(elemento, indice, array) {
            salidaspw.push(elemento.count);
            _totalegresospw += parseInt(elemento.count);
        });

        console.log("entradas",entradas);
        console.log("salidas cw",salidascw);
        console.log("salidas pw",salidaspw);
        console.log("Total Ingresos EgresosCW EgresosPW",_totalingresos,_totalegresoscw,_totalegresospw);            

        var newseries=[
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

        this.setState({
            data: result,
            isLoading: true,
            series: newseries,
            totalIngresos: _totalingresos,
            totalEgresoscw: _totalegresoscw,
            totalEgresospw: _totalegresospw
        });
            
    }

    getResumen(){
        OrdenesServices.getResumenESOrdenes()
        .then(
            result => {

                console.log("getResumen => OrdenesServices.getResumenESOrdenes",result);
                var xxx = result.filter(x=>x.type==='entries');
                var yyy = result.filter(x=>x.type==='outputs_cw');
                var zzz = result.filter(x =>x.type==='outputs_pw')
                
                console.log('xxx', xxx);
                console.log('yyy', yyy);
                console.log('zzz', zzz);

                var entradas=[];
                var salidascw = [];            
                var salidaspw = [];
                var _totalingresos=0,_totalegresoscw=0,_totalegresospw=0;
                
                xxx.forEach(function(elemento, indice, array) {
                    entradas.push(elemento.count);
                    _totalingresos += parseInt(elemento.count);
                });

                yyy.forEach(function(elemento, indice, array) {
                    salidascw.push(elemento.count);
                    _totalegresoscw += parseInt(elemento.count);
                });

                zzz.forEach(function(elemento, indice, array) {
                    salidaspw.push(elemento.count);
                    _totalegresospw += parseInt(elemento.count);
                });

                console.log("entradas",entradas);
                console.log("salidas cw",salidascw);
                console.log("salidas pw",salidaspw);
                console.log("Total Ingresos EgresosCW EgresosPW",_totalingresos,_totalegresoscw,_totalegresospw);            

                var newseries=[
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

                this.setState({
                    data: result,
                    isLoading: true,
                    series: newseries,
                    totalIngresos: _totalingresos,
                    totalEgresoscw: _totalegresoscw,
                    totalEgresospw: _totalegresospw
                });
            }
        ).catch(
            err => {
                console.log("getResumen => OrdenesServices.getResumenESOrdenes ERROR: ",err);

            }
        )
    }

    componentDidMount() {
        this.setState({ isLoading: false });
        this.getResumen();
    }
    
    render() { 

        console.log(this.state.series);

        if (this.setState.error) {
            return <p>{this.state.error.message}</p>
        }

        if (!this.state.isLoading) {
            return <p>Loading...</p>
        }

        return ( 
            <Container 
            style={{
                width: "100%",
                marginTop: "1rem",
                background: "#F7F8F9"
            }}>
                <Row sm={12}>
                    <Col sm={8}>
                        <div className="mixed-chart">
                            <Chart
                            options={this.state.options}
                            series={this.state.series}
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
                                background: "#E0E6EA" }}>
                                <Card.Title style={{color:"#1172B1"}} >Balance</Card.Title>
                                <Card.Text style={{color:"#1172B1"}} >
                                    <div className="flex-row">
                                       <p>Entradas: {this.state.totalIngresos}</p> 
                                    </div>
                                    <div className="flex-row">
                                        <p>Salidas Sem. Actual: {this.state.totalEgresoscw}</p>
                                    </div>
                                    <div className="flex-row">
                                        <p>Salidas Sem. Anteriores: {this.state.totalEgresospw}</p>
                                    </div>
                                    <div className="flex-row">
                                        <p>Saldo Sem. Actual: {this.state.totalIngresos - this.state.totalEgresoscw}</p>
                                    </div>
                                    <div className="flex-row">
                                        <p>Saldo Sem. Anteriores: {this.state.totalIngresos - 
                                        (this.state.totalEgresoscw + this.state.totalEgresospw)}</p>
                                    </div>
                                </Card.Text>
                                
                            </Card>
                    </Col>
                </Row>
            </Container>            
         );
    }
}
 
export default Statistics;