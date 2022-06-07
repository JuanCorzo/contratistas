import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Pais from '../../../helpers/paises';
import Macrozona from '../../../helpers/macrozonas';
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';
const cookies = new Cookies(); 

class Crearterr extends Component {
    state = {
        muni: {},
        cons:[],
        status: null
    };
    componentDidMount() {}
    guardar = (e) =>{
        e.preventDefault();
        const tabe = {
            "paises_idpaises": document.forma.idpais.value,
            "ter_cod": document.forma.Codigo.value,
            "ter_nombre": document.forma.Nombre.value,
            "ter_macrozona": document.forma.Macro.value,
        }
        guarda(tabe, "aportantes/territoriales", "Territorial", "/territoriales");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/territoriales"/>; }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"territoriales", name:"Territoriales"},{href:"#", name:"Crear Territorial"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar Territorial"/>
                <div className="am-mainpanel">
                    
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>
                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm" style={{width: '700px'}}>
                                    <div className="modal-body pd-20">

                                    <TituloModal titulo="Agregar Territorial"/>
                                    
                                        <div className='row'>
                                            <Pais valor={this.state.paises_idpaises} col="6"/>
                                            <Fila nombre="Código" refer="Codigo" tipo="1" arreglo=""  col="6"/>
                                        </div>
                                        <div className='row'>
                                            <Fila nombre="Terrirorial" refer="Nombre" tipo="1" arreglo="" col="6"/>
                                            <Macrozona col="6"/>
                                        </div>
                                
                                    
                                </div>
                                <Botones enlace='/territoriales'/>    
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