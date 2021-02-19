import React, { Component } from 'react';
import myImage from './baseline_preview_black_18dp.png';


class Orden extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ot: props.ot,
        }   
    }


    onButtonClick = () => {
        //console.log('OT Nro.: '+this.state.ot.nroorden);
       // var dias = this.state.ot.diasentaller;
        //console.log('Días en taller: '+dias.toString());
        console.log(this.state.ot);      

    };

    render() { 
        var color='';

        if(this.state.ot.diasentaller===1) color='pendiente';
        if(this.state.ot.diasentaller===2) color='atencion';
        if(this.state.ot.diasentaller>2) color='critico';
        if(this.state.ot.estado==='TERMINADO' && this.state.ot.horasterminado <= 72 ) color='terminado';
        if(this.state.ot.estado==='TERMINADO' && this.state.ot.horasterminado > 72 &&  this.state.ot.horasterminado <= 168) color='atencion';
        if(this.state.ot.estado==='TERMINADO' && this.state.ot.horasterminado > 168 ) color='critico';

        var clases = 'span '+color;

        return ( 
            <React.Fragment>
                <span className={clases}>
                    <button style={{backgroundColor:'transparent',borderColor:'transparent'}} onClick={this.onButtonClick}>
                        <img src={myImage}/>
                    </button>
                </span>               

            </React.Fragment>
         );
    }
}
 
export default Orden;
