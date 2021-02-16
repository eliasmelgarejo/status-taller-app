import React, { Component } from "react";
import OrdenListing from './OrdenListing';
import './style.css';


//url del api del sti hecho en spring
const url_base_sti = "http://localhost:8090/api";

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
        console.log('Render this.state.ordenes: ' + ordenes);

        /*return (
            <div>
                <p>{ordenes.length}</p>
            </div>
        )*/
        return <OrdenListing ordenes={this.state.ordenes} />;
    }
}

export default Dashboard;