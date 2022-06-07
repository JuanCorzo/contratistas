import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import TituloModal from '../../../comunes/TituloModal';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Menus from '../../../helpers/menus';
import Rol from '../../../helpers/roles';
import Breadcrumb from '../../../layout/Breadcrumb';

const cookies = new Cookies(); 

class editaperm extends Component {
    Trabajador = React.createRef(); 
    idc = null;
    state = { tabe: {}, cons:[], status: null, sino:['1', '0'] };
    componentDidMount() {
        this.idc=this.props.match.params.id;
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe1 = {
            "menus_idmenus": document.forma.menus.value,
            "roles_idroles": document.forma.irol.value,
            "per_crear": document.forma.Crear.value,
            "per_editar": document.forma.Editar.value,
            "per_eliminar": document.forma.Eliminar.value
        }
        actualiza(tabe1, "permisos", "Permiso", this.idc, "/permisos");
        this.setState({ status: 'Ok'})
    }
    dato = (tabe) => { 
        this.setState(tabe); 
        document.forma.menus.value=tabe[0].menus_idmenus; 
        document.forma.irol.value=tabe[0].roles_idroles; 
        document.forma.Crear.value=tabe[0].per_crear; 
        document.forma.Editar.value=tabe[0].per_editar; 
        document.forma.Eliminar.value=tabe[0].per_eliminar; 
    }

    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/permisos"/>; }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../permiso", name:"Permisos"},{href:"editarperm", name:"Editar Permiso"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Permiso"/>
                <div className="am-mainpanel">
                
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">

                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm" style={{width: '700px'}}>
                                    <div className="modal-body pd-20">
                                    
                                    <TituloModal titulo="Editar Permiso"/>
                                    
                                    <div className='row'>
                                        <Menus col="6"/>

                                        <Rol valor={this.state.roles_idroles }col="6"/>
                                    </div>
                                    <div className='row'>
                                        <Fila nombre="Crear" refer="Crear" tipo="6" arreglo={this.state.sino} defecto={this.state.per_crear} col="6"/>
                                        <Fila nombre="Editar" refer="Editar" tipo="6" arreglo={this.state.sino} defecto={this.state.per_editar} col="6"/>
                                    </div>
                                    <div className='row'>
                                        <Fila nombre="Eliminar" refer="Eliminar" tipo="6" arreglo={this.state.sino} defecto={this.state.per_eliminar} col="6"/>
                                    </div>
                                </div>
                                <Botones enlace='/permisos'/>    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
                <Script2 id={this.props.match.params.id} tabla="permisos" devuelvedatos={this.dato} />
            </div>
        );
    }
}
export default editaperm;