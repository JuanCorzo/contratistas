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
class estNomina extends Component {
    state = { rols:[], status: null, dato:"" };
    componentDidMount() {  }
    dato = (rols) => { 
        this.setState({ rols }); 
        axios.get(global.url + "sectores", global.autentica)
        .then(res => {
            let rols = res.data;
            rols =  rols.map( (p) => { p['idc'] = p.idsectores; return p; });
            this.setState({ rols });
        });
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/naturaleza-entidades"/>;}
        const columnas = [
            { title: 'ID', field:'idc', sortable: true },
            { title: 'Código', field: 'sec_codigo', sortable: true },
            { title: 'Nombre', field: 'sec_nombre', sortable: true }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                    <div className='m-auto pt-5'>
                        <Titulo titulo="Clasificación por tipo de NIT"/>
                        <div className="am-mainpanel">
                            <div className="card pd-20 pd-sm-40">
                                <Script3 tabla="sectores" devuelvedatos={this.dato} />
                                <EncTabla titulo="Clasificación por tipo de NIT" link="/crearsect" titulo2="Tipo de NIT" />
                                <Tabla tabla="sectores" columnas={columnas} valores={this.state.rols} 
                                redire="/naturaleza-entidades" titulo="Clasificación por tipo de NIT" link="editasect/" />
                            </div>
                        </div>
                    </div>    
                <Footer></Footer>
            </div>
        );
    }
}
export default estNomina;