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

class Creaarestn extends Component {
    state = { roles: {}, status: null };
    componentDidMount() { }
    guardar = (e) =>{
        e.preventDefault();
        const nuev = {
            est_codigo: document.forma.Codigo.value, 
            est_nombre: document.forma.Nombre.value,
            est_descripcion: document.forma.Desc.value
        }
        guarda(nuev, "estructuranomnina", "Factor salarial", "/EstructuraNomina");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){ return <Redirect to="/EstructuraNomina"/>; }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"EstructuraNomina", name:"Factores salariales"},{href:"Crearestn", name:"Agregar factor salarial"}];
        return (
            <div>
                <Header/>
                <Menulat/>
                <Titulo titulo="Agregar Factor Salarial"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <Breadcrumb links={linksBreadcrumb}></Breadcrumb>
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Factor Salarial</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <Fila nombre="Código" refer="Codigo" tipo="1" arreglo=""  />
                                        <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" />
                                        <Fila nombre="Descripción" refer="Desc" tipo="1" arreglo="" />
                                    </div>
                                </div>
                                <Botones enlace='/EstructuraNomina'/>    
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Creaarestn;