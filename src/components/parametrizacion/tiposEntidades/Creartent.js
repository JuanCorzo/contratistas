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

class Creartent extends Component {
    state = { roles: {}, status: null };
    componentDidMount() { }
    guardar = (e) =>{
        e.preventDefault();
        const nuev = {
            tad_codigo: document.forma.Codigo.value, 
            tad_descripcion: document.forma.Descripcion.value
        }
        guarda(nuev, "tipoadscrita", "Orden entidades", "/Tipos-entidades");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){ return <Redirect to="/Tipos-entidades"/>; }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"Tipos-Entidades", name:"Orden entidades"},{href:"Creartent", name:"Agregar orden de entidades"}];
        return (
            <div>
                <Header/>
                <Menulat/>
                <Titulo titulo="Agregar Tipos Entidades"/>
                <div className="am-mainpanel">
                    <Breadcrumb links={linksBreadcrumb}></Breadcrumb>
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Orden Entidad</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <Fila nombre="Código" refer="Codigo" tipo="1" arreglo=""  />
                                        <Fila nombre="Descripción" refer="Descripcion" tipo="1" arreglo="" />
                                    </div>
                                </div>
                                <Botones enlace='/Tipos-entidades'/>    
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Creartent;