import React, { Component } from "react";
import iconAlert from './../components/Dashboard/assets/alert-icon-24.png';

class home extends Component {
    handleGoDashboard() {
        window.location.href = "/dashboard";
    }

    style = {

    }

    render() {
        return (
            <div className='panel-default' style={{
                width: '65%', height: '50%', color: '#212529bd',
                background: '#ffffff', borderRadius: '5px', borderStyle: 'groove',
                borderRadius: '10px', boxShadow: '10px 10px 5px grey'
            }} >
                <div class="panel-heading" style={{
                    background: '#007bff ', color: '#000', borderRadius: '10px', opacity: '0.75'
                }} >
                    <h3 class="panel-title">Bienvenido al Sistema de Status Taller</h3>
                </div>
                <div class="panel-body" style={{ textAlign: "left", borderRadius: '10px' }}>
                    <p>Las Ordenes se agrupan en dos columnas por las secciones de Mecánica (MEC) y Chapería y Pintura (CYP).
                    Cada columna se organiza por tres (3) grupos de estados con un código de colores detallado más abajo.
                    Los estados son Pendiente, En Proceso y Terminado.
                    </p>
                    <p>Definición de estados y de colores utilizado</p>
                    <table style={{ borderStyle: 'normal' }}>
                        <thead>
                            <th>Sección</th>
                            <th>Estado</th>
                            <th>Color</th>
                            <th>Definición</th>
                        </thead>
                        <tbody>
                            {/* Pendientes */}
                            <tr>
                                <td><div style={{ fontWeight: 'bold', color: '#2a58dc' }}>MEC/CYP</div></td>
                                <td>Pendiente</td>
                                <td><div style={{ fontWeight: 'bold', color: '#58f764' }}>Normal</div></td>
                                <td>Sin Mano de Obra con 1 días en taller </td>
                            </tr>
                            <tr>
                                <td><div style={{ fontWeight: 'bold', color: '#2a58dc' }}>MEC/CYP</div></td>
                                <td>Pendiente</td>
                                <td><div style={{ fontWeight: 'bold', color: '#e4994a' }}>Atención</div></td>
                                <td>Sin Mano de Obra con 2 días en taller </td>
                            </tr>
                            <tr>
                                <td><div style={{ fontWeight: 'bold', color: '#2a58dc' }}>MEC/CYP</div></td>
                                <td>Pendiente</td>
                                <td><div style={{ fontWeight: 'bold', color: '#d16060' }}>Crítico </div></td>
                                <td>Sin Mano de Obra con más de 3 días en taller </td>
                            </tr>
                            {/* En Proceso */}
                            <tr>
                                <td><div style={{ fontWeight: 'bold', color: '#2a58dc' }}>MEC/CYP</div></td>
                                <td>En Proceso</td>
                                <td><div style={{ fontWeight: 'bold', color: '#58f764' }}>Normal</div></td>
                                <td>Con Mano de Obra con 1 días en taller </td>
                            </tr>
                            <tr>
                                <td><div style={{ fontWeight: 'bold', color: '#2a58dc' }}>MEC/CYP</div></td>
                                <td>En Proceso</td>
                                <td><div style={{ fontWeight: 'bold', color: '#e4994a' }}>Atención</div></td>
                                <td>Con Mano de Obra con 2 días en taller </td>
                            </tr>
                            <tr>
                                <td><div style={{ fontWeight: 'bold', color: '#2a58dc' }}>MEC/CYP</div></td>
                                <td>En Proceso</td>
                                <td><div style={{ fontWeight: 'bold', color: '#d16060' }}>Crítico</div></td>
                                <td>Con Mano de Obra con más de 3 días en taller </td>
                            </tr>
                            {/* Terminado */}
                            <tr>
                                <td><div style={{ fontWeight: 'bold', color: '#2a58dc' }}>MEC/CYP</div></td>
                                <td>Terminado</td>
                                <td><div style={{ fontWeight: 'bold', color: '#79f9f5' }}>Normal</div></td>
                                <td>Trabajos terminados menor a 24 horas </td>
                            </tr>
                            <tr>
                                <td><div style={{ fontWeight: 'bold', color: '#2a58dc' }}>MEC/CYP</div></td>
                                <td>Terminado</td>
                                <td><div style={{ fontWeight: 'bold', color: '#e4994a' }}>Atención</div></td>
                                <td>Trabajos terminados mayor a 24 horas y menor a 72 horas </td>
                            </tr>
                            <tr>
                                <td><div style={{ fontWeight: 'bold', fontWeight: 'bold', color: '#2a58dc' }}>MEC/CYP</div></td>
                                <td>Terminado</td>
                                <td><div style={{ fontWeight: 'bold', color: '#d16060' }}>Crítico</div></td>
                                <td>Trabajos terminados mayor a 72 horas </td>
                            </tr>
                            <tr><br /></tr>
                        </tbody>
                    </table>
                    <p>(*) Las ordenes (OT) indicadas como PRIORITARIAS se marcan con un ícono de alerta
                    <img src={iconAlert} /> </p>
                </div>
            </div >
        );
    }
}
export default home;