import React, { Component } from 'react';
import './style.css';


const url_base_sti = "http://localhost:8090/api";


class DiasHabilesComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            diashabiles: null,
            isLoading: false,
            error: null
        };
    }

    componentDidMount() {

        this.setState({ isLoading: false });

        var status_uri = '/diashabilesenero';

        fetch(url_base_sti + status_uri)
            .then(response => response.json())
            .then(result => {
                console.log('Respuesta de fetch result', result);
                this.setState({
                    diashabiles: result,
                    isLoading: true,
                });
            })
            .catch(error => {
                this.setState({ error: error.message });
                console.error({ error, isLoading: false });
            });
    }

    render() {
        const { diashabiles, isLoading, error } = this.state;
        if (this.setState.error) {
            return <p>{error.message}</p>
        }

        if (!isLoading) {
            return <p>Loading...</p>
        }

        console.log('Render....');
        console.log('Render this.state.diashabiles: ' + diashabiles);

        return (
            <div className='dashboardResult'>
                <p>{diashabiles}</p>
            </div>
        )
    }
}

export { DiasHabilesComponent };
