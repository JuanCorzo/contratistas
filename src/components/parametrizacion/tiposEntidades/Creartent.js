import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';
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
        guarda(nuev, "tipoadscrita", "Orden entidades", "/tipoadscrita");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){ return <Redirect to="/tipoadscrita"/>; }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"Tipos-Entidades", name:"Orden entidades"},{href:"#", name:"Agregar orden de entidades"}];
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
                                    
                                        <TituloModal titulo="Agregar Orden de Entidades"/>
                                        <div className='row'>
                                            <Fila nombre="Código" refer="Codigo" tipo="1" arreglo=""  col="4"/>
                                            <Fila nombre="Descripción" refer="Descripcion" tipo="1" arreglo="" col="8"/>
                                        </div>
                                    </div>
                                    <Botones enlace='/tipoadscrita'/> 
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
export default Creartent;