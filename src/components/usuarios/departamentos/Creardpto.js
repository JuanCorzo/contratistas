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
import Territorial from '../../../helpers/territoriales';
const cookies = new Cookies(); 

class Creardpto extends Component {
    state = { muni: {}, cons:[], status: null };
    componentDidMount() {
        axios.get(global.url + "territorial/listar", global.autentica).then((res) => {
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
            "territorial_idterritorial": document.forma.idterritorial.value,
            "dep_codigo": document.forma.Codigo.value,
            "dep_nombre": document.forma.Nombre.value,
        }
        guarda(tabe, "departamentos", "Departamento", "/Departamentos");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/Departamentos"/>; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar Departamento"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Departamento</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Territorial valor={this.state.idterritorial}/>
                                    <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" />
                                    <Fila nombre="Departamento" refer="Nombre" tipo="1" arreglo="" />
                                </div>
                                <Botones enlace='/Departamentos'/>    
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
export default Creardpto;