import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Departamento from '../../../helpers/municipios';
const cookies = new Cookies(); 

class Crearterr extends Component {
    state = { muni: {},   cons:[], status: null };
    componentDidMount() {}
    guardar = (e) =>{
        e.preventDefault();
        const tabe = {
            "ciudades_idciudades": document.forma.Municipio.value,
            "sed_codigo": document.forma.Codigo.value,
            "sed_nombre": document.forma.Nombre.value,
            "sed_direccion": document.forma.Direcc.value
        }
        guarda(tabe, "sedes", "Sede", "/sedes");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/sedes"/>; }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"sedes", name:"Listado de Sedes"}, {href:"#", name:"Crear Sede"}];

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

                                        <TituloModal titulo="Agregar Sedes"/>       

                                        <Departamento valor={this.state.iddepartamentos} col1="6" col2="6"/>
                                        <div className="row mt-4">
                                            <Fila nombre="Código" refer="Codigo" tipo="1" col="3" arreglo="" />
                                            <Fila nombre="Nombre sede" refer="Nombre" tipo="1" col="5" arreglo="" />
                                            <Fila nombre="Dirección" refer="Direcc" tipo="1" col="4" arreglo="" />
                                        </div>
                                    </div>
                                    <Botones enlace='/sedes'/>    
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
export default Crearterr;