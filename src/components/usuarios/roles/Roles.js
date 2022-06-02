import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Script3 from '../../../scripts/scripts3';
import EncTabla from '../../../comunes/EncTabla';
import Tabla from '../../../comunes/Tabla';
import axios from 'axios';
import global from '../../../Global';

const cookies = new Cookies(); 
class Roles extends Component {
    state = { rols:[], status: null, dato:"" };
    componentDidMount() { }
    dato = (rols) => { 
        this.setState({ rols });
        axios.get(global.url + "roles", global.autentica)
        .then(res => {
            let rols = res.data;
            rols =  rols.map( (p) => { p['idc'] = p.idroles; return p; });
            this.setState({ rols });
        });
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/Roles"/>;}
        const columnas = [
            { title: 'ID', field:'idc', sortable: true },
            { title: 'Rol Nombre', field: 'rol_nombre', sortable: true }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Roles de acceso"/>
                <div className='am-mainpanel m-auto' style={{width: "83%", paddingLeft: "19em",paddingRight: "3em", paddingTop: "8.5em"}}>
                    <div className="card pd-20 pd-sm-40">
                        <Script3 tabla="roles" devuelvedatos={this.dato} />
                        <EncTabla titulo="Roles de acceso" link="/crearrol" titulo2="Rol" />
                        <Tabla tabla="roles" columnas={columnas} valores={this.state.rols} 
                        titulo="Roles de acceso" link="editarol/" redire="/Roles" />
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Roles;