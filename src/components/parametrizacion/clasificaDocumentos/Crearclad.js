import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Breadcrumb from '../../../layout/Breadcrumb';
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

class Creaarrol extends Component {
    state = { roles: {}, status: null };
    componentDidMount() { }
    guardar = (e) =>{
        e.preventDefault();
        const nuev = {cld_nombre: document.forma.Rol.value}
        guarda(nuev, "clasificas", "Clasificación documentos", "/clasificacion-documento");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/clasificacion-documento"/>; }let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"clasificacion-documento", name:"Clasificación Documentos"}, {href:"Crearclad", name:"Agregar clasificación Documentos"}];
        return (
            <div>
                <Header/>
                <Menulat/>
                <Titulo titulo="Agregar Clasificación documentos"/>
                <div className="am-mainpanel">
                    <Breadcrumb links={linksBreadcrumb}></Breadcrumb>
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Clasificación documentos</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <Fila nombre="Nombre clasificación" refer="Rol" tipo="1" />
                                    </div>
                                </div>
                                <Botones enlace='/clasificacion-documento'/>    
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Creaarrol;