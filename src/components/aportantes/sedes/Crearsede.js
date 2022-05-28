import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Departamento from '../../../helpers/municipios';
const cookies = new Cookies(); 

class Crearterr extends Component {
    state = { muni: {},   cons:[], status: null };
    componentDidMount() {}
    guardar = (e) =>{
        e.preventDefault();
        const tabe = {
            "ciudades_idciudades": document.forma.Municipio.value,
            "sed_codigo": document.forma.Codigo.value,
            "sed_nombre": document.forma.Nombre.value,
            "sed_direccion": document.forma.Direcc.value
        }
        guarda(tabe, "sedes", "Sede", "/sedes");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/sedes"/>; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar Sede"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Sedes</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Departamento valor={this.state.iddepartamentos}/>
                                    <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" />
                                    <Fila nombre="Nombre sede" refer="Nombre" tipo="1" arreglo="" />
                                    <Fila nombre="Dirección" refer="Direcc" tipo="1" arreglo="" />
                                </div>
                                <Botones enlace='/sedes'/>    
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
export default Crearterr;