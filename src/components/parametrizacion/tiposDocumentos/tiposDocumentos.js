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
import Breadcrumb from '../../../layout/Breadcrumb';

const cookies = new Cookies(); 
class tiposDocumentos extends Component {
    state = { rols:[], status: null, dato:"" };
    componentDidMount() {  }
    dato = (rols) => { 
        this.setState({ rols }); 
        axios.get(global.url + "tiposdocumentos", global.autentica)
        .then(res => {
            let rols = res.data;
            rols =  rols.map( (p) => { p['idc'] = p.idtiposdocumentos; return p; });
            this.setState({ rols });
        });
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/Tipos-documentos"/>;}
        const columnas = [
            { title: 'ID', field:'idc', sortable: true },
            { title: 'Tipo documento', field: 'tid_clasifica', sortable: true },
            { title: 'Nombre', field: 'tid_nombre', sortable: true },
            { title: 'Aprobación', field: 'tid_aprobacion', sortable: true }
        ]
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"Tipos-docuemntos", name:"Tipos documentos"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                
                <div className="pt-5 m-auto">
                    <div className="am-mainpanel">
                    
                        <div className="card pd-20 pd-sm-40">
                            <Script3 tabla="tiposdocumentos" devuelvedatos={this.dato} />
                            <EncTabla titulo="Tipos documentos" link="/creartdoc" titulo2="Tipos documentos" />
                            <Tabla tabla="tiposdocumentos" columnas={columnas} valores={this.state.rols} 
                            redire="/Tipos-docuemntos" titulo="Tipos documentos" link="editatdoc/" />
                        </div>
                    </div>   
                </div>    
                <Footer></Footer>
            </div>
        );
    }
}
export default tiposDocumentos;