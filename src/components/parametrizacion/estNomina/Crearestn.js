import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Breadcrumb from '../../../layout/Breadcrumb';
import Cookies from 'universal-cookie';
import TituloModal from '../../../comunes/TituloModal';

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
        guarda(nuev, "estructuranomnina", "Factor salarial", "/estructuranomnina");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){ return <Redirect to="/estructuranomnina"/>; }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"EstructuraNomina", name:"Factores salariales"},{href:"#", name:"Agregar factor salarial"}];
        return (
            <div>
                <Header/>
                <Menulat/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm mt-3" style={{width: '700px'}}>
                                    <div className="modal-body p-6">

                                        <TituloModal titulo="Agregar Factor Salarial"/>

                                        <div className='row'>
                                            <Fila nombre="Código" refer="Codigo" tipo="1" arreglo=""  col="4"/>
                                            <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" col="8"/>
                                        </div>
                                        <div className='row'>
                                            <Fila nombre="Descripción" refer="Desc" tipo="1" arreglo="" col="12"/>
                                        </div>
                                    </div>
                                    <Botones enlace='/estructuranomnina'/>    
                                </div>
                                
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