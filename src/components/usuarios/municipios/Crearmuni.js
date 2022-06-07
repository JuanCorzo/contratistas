import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Departamento from '../../../helpers/departamentos';
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';
const cookies = new Cookies(); 

class Crearmuni extends Component {
    state = {
        muni: {},
        cons:[],
        status: null
    };
    componentDidMount() {
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = {
            "departamentos_iddepartamentos": document.forma.Departamento.value,
            "ciu_codigo": document.forma.Codigo.value,
            "ciu_nombre": document.forma.Municipio.value
        }
        guarda(tabe, "ciudades", "Municipio", "/Municipios");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/Municipios"/>; }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"Municipios", name:"Municipios"},{href:"#", name:"Agregar Municipio"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm mt-3" style={{width: '700px'}}>
                                    <div className="modal-body p-6">
                                    
                                    <TituloModal titulo="Agregar Municipio"/>

                                    <div className='row'>
                                        <Departamento valor={this.state.iddepartamentos} col="12"/>
                                        <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" col="4"/>
                                        <Fila nombre="Nombre" refer="Municipio" tipo="1" arreglo="" col="8" />
                                    </div>
                                </div>
                                <Botones enlace='/Municipios'/>    
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
export default Crearmuni;