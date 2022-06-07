import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import TituloModal from '../../../comunes/TituloModal';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import global from '../../../Global';
import Cookies from 'universal-cookie';
import Menus from '../../../helpers/menus';
import Rol from '../../../helpers/roles';
import Breadcrumb from '../../../layout/Breadcrumb';
const cookies = new Cookies(); 

class Crearperm extends Component {
    state = { muni: {}, cons:[], status: null, sino:['1', '0'] };
    componentDidMount() {
        axios.get(global.url + "menus", global.autentica).then((res) => {
            if (res.data) {
                let cons = res.data;
                cons =  cons.map( (p) => { p['id'] = p.iddepartamentos; p[`nombre`] = p.dep_nombre; return p; });
                this.setState({ cons });
            }
          });
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = {
            "menus_idmenus": document.forma.menus.value,
            "roles_idroles": document.forma.irol.value,
            "per_crear": document.forma.Crear.value,
            "per_editar": document.forma.Editar.value,
            "per_eliminar": document.forma.Eliminar.value
        }
        guarda(tabe, "permisos", "Permiso", "/permisos");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/permisos"/>; }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"permisos", name:"Permisos"}, {href:"#", name:"Crear permiso"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar Permisos"/>
                <div className="am-mainpanel">
                
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">

                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm" style={{width: '700px'}}>

                                    <div className="modal-body pd-20">

                                        <TituloModal titulo="Agregar Permiso"/>
                                        <div className='row'>
                                            <Menus valor={this.state.idmenus} col="6"/>
                                       
                                            <Rol valor={this.state.idroles} col="6"/>
                                        </div>    
                                        <div className='row'>
                                            <Fila nombre="Crear" refer="Crear" tipo="6" arreglo={this.state.sino} col="6"/>
                                        
                                            <Fila nombre="Editar" refer="Editar" tipo="6" arreglo={this.state.sino} col="6" />
                                        </div> 
                                        <div className='row'>   
                                            <Fila nombre="Eliminar" refer="Eliminar" tipo="6" arreglo={this.state.sino} col="6"/>
                                        </div>    
                                        
                                    </div>
                                    <Botones enlace='/permisos'/>    
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
export default Crearperm;