import React from "react";

const OrdenListing = ({ ordenes }) => (
    <div className="container">
        <h1>Status taller</h1>
        <table className="table table-bordered">
            <tr>
                <th>Orden</th>
                <th>Asesor</th>
                <th>Apertura</th>
                <th>Salida</th>
                <th>Dias En Taller</th>
                <th>MO Cargada</th>
                <th>Con Trabajo</th>
                <th>Terminado</th>
                <th>Estado</th>
                <th>Vehiculo</th>
                <th>Chasis</th>
                <th>Cliente</th>
                <th>Tipo Servicio</th>
            </tr>

            {ordenes.map((o, index) => (
                <tr data-index={index}>
                    <td>{o.nroorden}</td>
                    <td>{o.asesor}</td>
                    <td>{o.apertura}</td>
                    <td>{o.salida}</td>
                    <td>{o.diasentaller}</td>
                    <td>{o.mocargadas}</td>
                    <td>{o.contrabajos}</td>
                    <td>{o.terminados}</td>
                    <td>{o.estado}</td>
                    <td>{o.marcmodever}</td>
                    <td>{o.chasis}</td>
                    <td>{o.cliente}</td>
                    <td>{o.tiposervicio}</td>
                </tr>

            ))}

        </table>
    </div>
);

export default OrdenListing