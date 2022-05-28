import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import global from '../../../Global';
import Cookies from 'universal-cookie';
import Menus from '../../../helpers/menus';
import Rol from '../../../helpers/roles';
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
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar Permisos"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Permisos</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Menus valor={this.state.idmenus}/>
                                    <Rol valor={this.state.idroles}/>
                                    <Fila nombre="Crear" refer="Crear" tipo="6" arreglo={this.state.sino} />
                                    <Fila nombre="Editar" refer="Editar" tipo="6" arreglo={this.state.sino} />
                                    <Fila nombre="Eliminar" refer="Eliminar" tipo="6" arreglo={this.state.sino} />
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