import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class SeccionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _seccion: null,
            _cantidad: null,
        }
    }

    componentDidMount() {
        this._update();
    }

    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        if(this.state._seccion !== nextProps.seccion){
            this.setState({_seccion: nextProps.seccion});
        }
        if(this.state.cantidad !== nextProps.cantidad){
            this.setState({_cantidad: nextProps.cantidad});
        }
    }

    _update() {
        this.setState((state, props) => ({
            _seccion: props.seccion,
            _cantidad: props.cantidad,
        }));
    }

    render() {
        return (
            <div className='subTitleComponent col-12 col-md-6 col-xl-6'>
                {this.state._seccion} - {this.state._cantidad} 
            </div>
        );
    }
}

export default SeccionComponent;