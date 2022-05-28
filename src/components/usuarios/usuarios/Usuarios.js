import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import { Redirect } from 'react-router-dom';
import Titulo from '../../../comunes/Titulo';
import Script3 from '../../../scripts/scripts3';
import EncTabla from '../../../comunes/EncTabla';
import Tabla from '../../../comunes/Tabla';
import Moment from 'react-moment';
import axios from 'axios';
import global from '../../../Global';

const cookies = new Cookies(); 
class Usuarios extends Component {
    state = { usua: [], status: null, dato:"" };
    componentDidMount() {}
    dato = (usua) => { 
        this.setState({ usua });
        axios.get(global.url + "usuarios", global.autentica)
        .then(res => {
            let usua = res.data;
            usua =  usua.map( (p) => { p['idc'] = p.idusuarios; return p; });
            this.setState({ usua });
        });
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){ return <Redirect to="./"/>; }
        const columnas = [
            { title: 'Rol', field:'rol_nombre', sortable: true },
            { title: 'Nombre', field: 'usu_nombre', sortable: true }, 
            { title: 'Email', field: 'usu_email', sortable: true },
            { title: 'Celular', field: 'usu_celular', sortable: true },
            { title: 'Activo hasta', field:'usu_fechafin', sortable: true, type: 'date',
            render: row => <Moment format="DD MMM YYYY">{ row["usu_fechafin"]}</Moment>},
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Usuarios del sistema"/>
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                        <Script3 tabla="usuarios" devuelvedatos={this.dato} />
                        <EncTabla titulo="Usuarios del sistema" link="/crearusuario" titulo2="Usuario" />
                        <Tabla tabla="usuarios" columnas={columnas} valores={this.state.usua} 
                        titulo="Usuarios del sistema" link="editausuario/" redire="/Usuarios" />
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Usuarios;