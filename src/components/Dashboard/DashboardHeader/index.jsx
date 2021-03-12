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
        // console.log('DashboardHeader componentWillReceiveProps this.props');
        // console.log(this.state);
        // console.log('DashboardHeader componentWillReceiveProps nextProps');
        // console.log(nextProps);
        if(this.state.h_cantidad_mec !== nextProps.hcantidad_mec){
            this.setState({h_cantidad_mec: nextProps.hcantidad_mec});
        }
        if(this.state.h_cantidad_cyp !== nextProps.hcantidad_cyp){
            this.setState({h_cantidad_cyp: nextProps.hcantidad_cyp});
        }
    }

    render() { 
        // console.log('DashboardHeader render this.state');
        // console.log(this.state);
        return ( 
            <div className='titleComponent'>
                <div className='row'>
                    <div className='subTitleComponent'>
                        Global - {this.state.h_total} 
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

// SeccionComponent.propTypes = {
//     h_cantidad_mec: PropTypes.number.isRequired,
//     h_cantidad_cyp: PropTypes.number.isRequired,
// };

export default DashboardHeader;