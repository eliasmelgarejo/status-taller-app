import React, { Component } from "react";
//import OrdenListing from './OrdenListing';
import TitleComponent from './DashboardHeader/index';
import DashboardBody from './DashboardBody';
import Select from 'react-select';
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
            asesorSelected: '*',
            marcaSelected: '*',
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

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.asesorSelected !== this.state.asesorSelected) {
          this.setState({ asesorSelected: nextProps.asesorSelected });
          this.setState({ ordenes: nextProps.ordenes });
          console.log("!!!!");
          console.log("!!!! this.state"+this.state.ordenes.length);
          console.log("!!!! nextProps"+nextProps.ordenes.length);
        }        
    }

    render() {
        const { ordenes, asesorSelected, marcaSelected, isLoading, error } = this.state;
        if (this.setState.error) {
            return <p>{error.message}</p>
        }

        if (!isLoading) {
            return <p>Loading...</p>
        }
        
        const lista = ordenes.map((orden)=>{
            return orden.asesor;
        });

        console.log("####################   LISTA   ###################");
        console.log(lista);
        let sinRepetidos = lista.filter((valor, indiceActual, lista) => lista.indexOf(valor) === indiceActual);
        sinRepetidos.push("*");
        console.log(sinRepetidos);

        const _asersoresprueba = sinRepetidos.map((o)=>{
            if(o==="*") return {label:"TODOS",value:o};
            return {label:o,value:o};
        });

        console.log("Asesore Prueba #####");
        console.log(_asersoresprueba);

         //<OrdenListing ordenes={this.state.ordenes}/>
         const Asesores = _asersoresprueba;
         /*  [
            { label: "TODOS", value: "*" },
            { label: "PACUA ORTIZ, RAUL MARCELO", value: "PACUA ORTIZ, RAUL MARCELO" },
            { label: "CUBILLA, CARLOS", value: "CUBILLA, CARLOS" },
            { label: "DIAZ VILLALBA, LETICIA", value: "DIAZ VILLALBA, LETICIA" },
            { label: "DORIS FRANCO", value: "DORIS FRANCO" },
            { label: "CORONEL PEREIRA, GUSTAVO ADOLFO", value: "CORONEL PEREIRA, GUSTAVO ADOLFO" },
            { label: "ASESOR VENTAS INTERNAS", value: "ASESOR VENTAS INTERNAS" },
            { label: "ASESOR TALLERES AUTORIZADOS", value: "ASESOR TALLERES AUTORIZADOS" }
        ];*/
        
        const Marcas = [
            { label: "TODOS", value: "*" },
            { label: "SUZUKI", value: "SUZUKI" },
            { label: "SSANG YONG", value: "SSANG YONG" },
            { label: "FOTON", value: "FOTON" },
            { label: "LIFAN", value: "LIFAN"},
            { label: "MG", value: "MG"},
            { label: "SOLIS", value: "SOLIS"}
        ];

        var ordenes_mec,ordenes_cyp;
        var cantidad_mec,cantidad_cyp;

        console.log('Render....');

        if(this.state.asesorSelected !== '*' ){
            //calcular los valores que necesito parsar a mis componentes
            ordenes_mec = ordenes.filter(orden => orden.seccion !== 'CYP' && orden.asesor === asesorSelected);
            ordenes_cyp = ordenes.filter(orden => orden.seccion === 'CYP' && orden.asesor === asesorSelected);

            cantidad_mec = ordenes_mec.length;
            cantidad_cyp = ordenes_cyp.length;

            console.log('MEC CANTIDAD: ', cantidad_mec.length);
            console.log('CYP CANTIDAD: ', cantidad_cyp.length);
       

        }else{
            console.log('Asesor Seleccionado: '+ asesorSelected);
            //calcular los valores que necesito parsar a mis componentes
            ordenes_mec = ordenes.filter(orden => orden.seccion !== 'CYP');
            ordenes_cyp = ordenes.filter(orden => orden.seccion === 'CYP');

            cantidad_mec = ordenes_mec.length;
            cantidad_cyp = ordenes_cyp.length;

            console.log('MEC CANTIDAD: ', cantidad_mec.length);
            console.log('CYP CANTIDAD: ', cantidad_cyp.length);

        }
      
        return (
            <div>
                <div className="row">
                    
                    <div className="col-md-2">Asesor: </div>
                    <div className="col-md-3">
                        <Select options={Asesores} onChange={(valor) => {
                            this.setState({asesorSelected:valor.value})
                        }}/>
                    </div>
                    <div className="col-md-2">Marca: </div>
                    <div className="col-md-2">
                        <Select options={Marcas} />
                    </div>
                </div>
                <TitleComponent cantidad_mec={cantidad_mec} cantidad_cyp={cantidad_cyp} ></TitleComponent>
                <DashboardBody ordenes={ordenes} asesorSelected={this.state.asesorSelected}></DashboardBody>
            </div>
        );
        
        
    }
}

export default Dashboard;