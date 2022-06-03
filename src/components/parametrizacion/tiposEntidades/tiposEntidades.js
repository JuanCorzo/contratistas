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
import Breadcrumb from '../../../layout/Breadcrumb';
import global from '../../../Global';
const cookies = new Cookies(); 
class tiposEntidades extends Component {
    state = { rols:[], status: null, dato:"" };
    componentDidMount() {  }
    dato = (rols) => { 
        this.setState({ rols }); 
        axios.get(global.url + "tipoadscrita", global.autentica)
        .then(res => {
            let rols = res.data;
            rols =  rols.map( (p) => { p['idc'] = p.idtipoadscrita; return p; });
            this.setState({ rols });
        });
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/Tipos-entidades"/>;}
        const columnas = [
            { title: 'ID', field:'idc', sortable: true },
            { title: 'Código', field: 'tad_codigo', sortable: true },
            { title: 'Orden', field: 'tad_descripcion', sortable: true }
        ]
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"Tipos-Entidades", name:"Orden entidades"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
<<<<<<< HEAD
                    <div className='m-auto pt-5'>
=======
                
>>>>>>> 994a213ba350bf910fb706ff1ecb24b1c3b3931c
                        <Titulo titulo="Orden de las entidades aportantes según la estructura del estado colombiano"/>
                        <div className="am-mainpanel">
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>
                            <div className="card pd-20 pd-sm-40">
                                <Script3 tabla="tipoadscrita" devuelvedatos={this.dato} />
                                <EncTabla titulo="Orden entidades" link="/creartent" titulo2="Orden entidades" />
                                <Tabla tabla="tipoadscrita" columnas={columnas} valores={this.state.rols} 
                                redire="/Tipos-entidades" titulo="Orden entidades" link="editatent/" />
                            </div>
                
                        <Footer></Footer>
                    </div>
                </div>        
        );
    }
}
export default tiposEntidades;