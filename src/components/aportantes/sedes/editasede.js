import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Departamento from '../../../helpers/municipios';

const cookies = new Cookies(); 

class editasede extends Component {
    idc = null;
    state = { tabe: {}, cons:[], status: null };
    componentDidMount() {
        this.idc=this.props.match.params.id;
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe1 = {
            "idsedes": this.idc,
            "ciudades_idciudades": document.forma.Municipio.value,
            "sed_codigo": document.forma.Codigo.value,
            "sed_nombre": document.forma.Nombre.value,
            "sed_direccion": document.forma.Direcc.value
        }
        actualiza(tabe1, "sedes", "Sede", this.idc, "/sedes");
        this.setState({ status: 'Ok'})
    }
    dato = (tabe) => { 
        this.setState(tabe); 
        document.forma.Departamento.value=this.state[0].iddepartamentos;
        document.forma.Municipio.value=this.state[0].ciudades_idciudades;

        document.forma.Codigo.value=this.state[0].sed_codigo; 
        document.forma.Nombre.value=this.state[0].sed_nombre;  
        document.forma.Direcc.value=this.state[0].sed_direccion;  
    }

    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26") { return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/sedes"/>; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Sede"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Editar Sede</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Departamento valor={this.state.iddepartamentos}/>
                                    <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" defecto={this.state.sed_codigo} />
                                    <Fila nombre="Nombre sede" refer="Nombre" tipo="1" arreglo="" defecto={this.state.sed_nombre} />
                                    <Fila nombre="Dirección" refer="Direcc" tipo="1" arreglo="" defecto={this.state.sed_direccion} />
                                </div>
                                <Botones enlace='/sedes'/>    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
                <Script2 id={this.props.match.params.id} tabla="sedes" devuelvedatos={this.dato} />
            </div>
        );
    }
}
export default editasede;