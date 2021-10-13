import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SeccionComponent from './SeccionComponent';
import './style.css';


class DashboardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            h_cantidad_mec: props.hcantidad_mec,
            h_cantidad_cyp: props.hcantidad_cyp,
            h_total: props.hcantidad_mec + props.hcantidad_cyp,
         }
    }

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        
        if(this.state.h_cantidad_mec !== nextProps.hcantidad_mec){
            this.setState({h_cantidad_mec: nextProps.hcantidad_mec});
        }
        if(this.state.h_cantidad_cyp !== nextProps.hcantidad_cyp){
            this.setState({h_cantidad_cyp: nextProps.hcantidad_cyp});
        }
    }

    render() { 
        
        return ( 
            <div className='titleComponent'>
                <div className='row'>
                    <div className='subTitleComponent'>
                        Global - {this.state.h_cantidad_mec + this.state.h_cantidad_cyp} 
                    </div>
                </div>
                <div className='row'>
                    <SeccionComponent seccion='MEC' cantidad={this.state.h_cantidad_mec} ></SeccionComponent>
                    <SeccionComponent seccion='CYP' cantidad={this.state.h_cantidad_cyp} ></SeccionComponent>
                </div>
            </div>
         );
    }
}

export default DashboardHeader;