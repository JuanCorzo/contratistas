import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Botones from '../../../comunes/Botones';
import TituloModal from '../../../comunes/TituloModal';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import global from '../../../Global';
import Cookies from 'universal-cookie';
import Breadcrumb from '../../../layout/Breadcrumb';
import Territorial from '../../../helpers/territoriales';
const cookies = new Cookies(); 

class Creardpto extends Component {
    state = { muni: {}, cons:[], status: null };
    componentDidMount() {
        axios.get(global.url + "territorial/listar", global.autentica).then((res) => {
            if (res.data) {
                let cons = res.data;
                cons =  cons.map( (p) => { p['id'] = p.iddepartamentos; p[`nombre`] = p.dep_nombre; return p; });
                this.setState({ cons });
            }
          });
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = {
            "territorial_idterritorial": document.forma.idterritorial.value,
            "dep_codigo": document.forma.Codigo.value,
            "dep_nombre": document.forma.Nombre.value,
        }
        guarda(tabe, "departamentos", "Departamento", "/Departamentos");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/Departamentos"/>; }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"Departamentos", name:"Departamentos"},{href:"#", name:"Crear Departamento"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">

                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm mt-3">
                                    <div className="modal-body p-6">

                                        <TituloModal titulo="Agregar Departamento"/>        

                                        <div className="row">
                                            <Territorial valor={this.state.idterritorial} col="5"/>
                                            <Fila nombre="Código" refer="Codigo" tipo="1" col="3" arreglo="" />
                                            <Fila nombre="Departamento" refer="Nombre" tipo="1" col="4" arreglo="" />
                                        </div>
                                    </div>
                                    <Botones enlace='/Departamentos'/>    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Creardpto;