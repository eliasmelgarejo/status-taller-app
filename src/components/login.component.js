import React, { Component } from "react";
import axios from "axios";
import LoginServices from './../services/LoginServices';
import RoutesServices from './../services/RoutesServices';

export const jwtToken = localStorage.getItem("authorization");

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: null,
            password: null,
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit = event => {
        event.preventDefault();

        const endpoint = "http://localhost:8090/auth";


        const username = this.state.username;
        const password = this.state.password;

        const user_object = {
            username: username,
            password: password
        };

        //console.log(user_object);
        if (user_object.username === null || user_object.password === null) {
            alert('Faltan datos para el login!!!')
        } else {
            // LoginServices.getLogin(user_object.username, user_object.password)
            axios.post(endpoint + '?username=' + user_object.username + '&password=' + user_object.password)
                .then(res => {
                    if (res.data.token === null) {
                        alert("Authentication failure");
                        this.props.history.push("/");
                    } else {
                        localStorage.setItem("authorization", res.data.token);
                        console.info(res.data.token);
                        this.props.history.push("/home");
                        //return this.handleHome();
                    }
                });
        }

    };

    handleHome() {
        // RoutesServices.getHome(jwtToken)
        axios.get("http://localhost:8090/home", { headers: { "Authorization": `${jwtToken}` } })
            .then(res => {
                console.log('res.data', res.data);
                if (res.data === "success") {
                    this.props.history.push("/home");
                } else {
                    alert("Authentication failure");
                    this.props.history.push("/");
                }
            });
    }

    handleUsuario = (e) => {
        e.preventDefault();
        const { event, target } = e

        console.warn(target.value);
        console.log(target.value);

        this.setState({
            username: target.value,
        })
    }

    handlePassword = (e) => {
        e.preventDefault();
        const { event, target } = e

        console.log(target.value);
        console.warn(target.value);

        this.setState({
            password: target.value,
        })
    }

    render() {

        return (
            <div style={{
                display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "left",
                width: "100%", height: "100%"
            }}>
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <form class="form-signin" onSubmit={this.handleFormSubmit}>
                            <h3>Inicio de Sesión</h3>

                            <div className="form-group">
                                <label>Usuario</label>
                                <input type="text" onBlur={e => this.handleUsuario(e)} className="form-control" placeholder="Usuario" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" onBlur={e => this.handlePassword(e)} className="form-control" placeholder="Password" />
                            </div>

                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-info btn-block">Aceptar</button>
                            {/* <p className="forgot-password text-right">
                                Forgot <a href="#">password?</a>
                            </p> */}<br />
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}