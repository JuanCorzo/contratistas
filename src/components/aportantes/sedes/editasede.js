import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Departamento from '../../../helpers/municipios';

const cookies = new Cookies(); 

class editasede extends Component {
    idc = null;
    state = { tabe: {}, cons:[], status: null };
    componentDidMount() {
        this.idc=this.props.match.params.id;
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe1 = {
            "idsedes": this.idc,
            "ciudades_idciudades": document.forma.Municipio.value,
            "sed_codigo": document.forma.Codigo.value,
            "sed_nombre": document.forma.Nombre.value,
            "sed_direccion": document.forma.Direcc.value
        }
        actualiza(tabe1, "sedes", "Sede", this.idc, "/sedes");
        this.setState({ status: 'Ok'})
    }
    dato = (tabe) => { 
        this.setState(tabe); 
        document.forma.Departamento.value=this.state[0].iddepartamentos;
        document.forma.Municipio.value=this.state[0].ciudades_idciudades;

        document.forma.Codigo.value=this.state[0].sed_codigo; 
        document.forma.Nombre.value=this.state[0].sed_nombre;  
        document.forma.Direcc.value=this.state[0].sed_direccion;  
    }

    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26") { return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/sedes"/>; }
        let linksBreadcrumb = [{href:"../inicio", name:"Inicio"}, {href:"../sedes", name:"Listado de Sedes"}, {href:"#", name:"Editar Sede"}];

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

                                        <TituloModal titulo="Editar Sede"/> 

                                        <Departamento valor={this.state.iddepartamentos} col1="6" col2="6"/>
                                        <div className="row mt-4">
                                            <Fila nombre="Código" refer="Codigo" tipo="1" col="3" arreglo="" defecto={this.state.sed_codigo} />
                                            <Fila nombre="Nombre sede" refer="Nombre" tipo="1" col="5" arreglo="" defecto={this.state.sed_nombre} />
                                            <Fila nombre="Dirección" refer="Direcc" tipo="1" col="4" arreglo="" defecto={this.state.sed_direccion} />
                                        </div>
                                    </div>
                                    <Botones enlace='/sedes'/>    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
                <Script2 id={this.props.match.params.id} tabla="sedes" devuelvedatos={this.dato} />
            </div>
        );
    }
}
export default editasede;