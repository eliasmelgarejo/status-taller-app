import React, { Component } from "react";
//import OrdenListing from './OrdenListing';
import TitleComponent from './DashboardHeader/index'
import DashboardBody from './DashboardBody';
import './style.css';


//url del api del sti hecho en spring
const url_base_sti = "http://10.0.10.129:8090/api";

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ordenes: [],
            isLoading: false,
            error: null,
        };
    }
    componentDidMount() {

        this.setState({ isLoading: false });
        var ordenes_uri = '/ordenes';

        fetch(url_base_sti + ordenes_uri)
            .then(response => response.json())
            .then(result => {
                console.log('Respuesta de fetch result', result);
                this.setState({
                    ordenes: result,
                    isLoading: true,
                });
            })
            .catch(error => {
                this.setState({ error: error.message });
                console.error({ error, isLoading: false });
            });
    }
    render() {
        const { ordenes, isLoading, error } = this.state;
        if (this.setState.error) {
            return <p>{error.message}</p>
        }

        if (!isLoading) {
            return <p>Loading...</p>
        }

        console.log('Render....');
        //console.log('Render this.state.ordenes: ' + ordenes.length);
        //calcular los valores que necesito parsar a mis componentes
        var ordenes_mec = ordenes.filter(orden => orden.tiposervicio !== 'CHAPERIA');
        var ordenes_cyp = ordenes.filter(orden => orden.tiposervicio === 'CHAPERIA');

        var cantidad_mec = ordenes_mec.length;
        var cantidad_cyp = ordenes_cyp.length;

        console.log('MEC CANTIDAD: ', cantidad_mec.length);
        console.log('CYP CANTIDAD: ', cantidad_cyp.length);

        //<OrdenListing ordenes={this.state.ordenes}/>

        return (
            <div>
                <TitleComponent cantidad_mec={cantidad_mec} cantidad_cyp={cantidad_cyp} ></TitleComponent>
                <DashboardBody ordenes={ordenes}></DashboardBody>
            </div>
        );
    }
}

export default Dashboard;