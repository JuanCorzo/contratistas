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
import Departamento from '../../../helpers/departamentos';
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
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar Municipio"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Municipio</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Departamento valor={this.state.iddepartamentos}/>
                                    <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" />
                                    <Fila nombre="Nombre" refer="Municipio" tipo="1" arreglo="" />
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