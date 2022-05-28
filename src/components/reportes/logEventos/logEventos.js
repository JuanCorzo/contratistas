import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Script3 from '../../../scripts/scripts3';
import Tabla3 from '../../../comunes/Tabla3';
const cookies = new Cookies(); 
class Roles extends Component {
    state = { rols:[], status: null, dato:"" };
    componentDidMount() {  }
    dato = (rols) => { this.setState({ rols }); }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/logs"/>;}
        const columnas = [
            { title: 'ID', field:'idc', sortable: true },
            { title: 'Fecha', field: 'log_fecha', sortable: true },
            { title: 'Acción', field: 'log_accion', sortable: true },
            { title: 'Elemento', field: 'log_objeto', sortable: true },
            { title: 'Usuario', field: 'usu_nombre', sortable: true }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Logs de eventos"/>
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                        <Script3 tabla="logs" devuelvedatos={this.dato} />
                        <Tabla3 tabla="logs" columnas={columnas} valores={this.state.rols} titulo="Logs de eventos" link="/" />
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Roles;