import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import Roles from '../../../helpers/roles';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import global from '../../../Global';
const cookies = new Cookies();

class Creaarrol extends Component {
    state = { usuas: {}, role:[], status: null, macr:[], terr:[] };
    componentDidMount() {
        axios.get(global.url + "macrozonas", global.autentica)
        .then(res => {
            let macr = res.data;
            this.setState({ macr });
        });
        axios.get(global.url + "aportantes/territoriales/terri", global.autentica)
        .then(res => {
            let terr = res.data;
            this.setState({ terr });
        });
    }
    llenater = () =>{
        var iddep = document.forma.Macro.value;
        if(iddep==="Macrozona I"){ iddep="1"; }
        if(iddep==="Macrozona II"){ iddep="2"; }
        if(iddep==="Macrozona III"){ iddep="3"; }
        axios.get(global.url+"aportantes/territoriales/macro/"+ iddep, global.autentica)
        .then(res => {
            const terr = res.data;
            this.setState({ terr });
        });
    }

    guardar = (e) =>{
        e.preventDefault();
        var macr = document.forma.Macro.value;
        if(macr===""){ macr="0"; }
        else if(macr==="Macrozona I"){ macr="1"; }
        else if(macr==="Macrozona II"){ macr="2"; }
        else if(macr==="Macrozona III"){ macr="3"; }
        var terr = document.forma.terr.value;
        if(terr===""){ terr="0"; }
        const tabe = {
            "roles_idroles": document.forma.irol.value,
            "usu_nombre": document.forma.Nombre.value,
            "usu_email": document.forma.Email.value,
            "usu_celular": document.forma.Celular.value,
            "usu_usuario": document.forma.Email.value,
            "usu_password": document.forma.Password.value,
            "usu_fechainicio": document.forma.Desde.value,
            "usu_fechafin": document.forma.Hasta.value,
            "usu_idmacrozona": macr,
            "usu_idterritorial": terr,
        }
        guarda(tabe, "auth/registro", "Usuario", "/Usuarios");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/Usuarios"/>; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar Usuario"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Usuario</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <Roles valor=""/>
                                        <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" defecto={this.state.usu_nombre} id="" />
                                        <Fila nombre="Email" refer="Email" tipo="3" arreglo="" id="" defecto={this.state.usu_email} />
                                        <Fila nombre="Contraseña" refer="Password" tipo="4" arreglo="" id="" defecto="" />
                                        <Fila nombre="Celular" refer="Celular" tipo="1" arreglo="" id="" defecto={this.state.usu_telefono} />
                                        <Fila nombre="Activo desde" refer="Desde" tipo="7" arreglo="" id="" defecto={this.state.usu_telefono} />
                                        <Fila nombre="Activo hasta" refer="Hasta" tipo="7" arreglo="" id="" defecto={this.state.usu_telefono} />
                                        <div className="row">
                                            <div className="col-md-6 izqq">Macrozonas</div>
                                            <div className="col-md-6 derechas">
                                                <select name="Macro" onChange={this.llenater} className="form-control" >
                                                    <option>Seleccione...</option>
                                                    {
                                                        this.state.macr.map((arr, i) => {
                                                        return (
                                                                <option key={i} value={arr.mac_nombre}>{arr.mac_nombre} </option>  
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 izqq">Territorial</div>
                                            <div className="col-md-6 derechas">
                                                <select className="form-control" name="terr" required>
                                                    <option vaule="0">Territorial</option>
                                                    {
                                                        this.state.terr.map((con, i) => {
                                                        return (
                                                            <option key={i} value={con.idterritorial}>{con.ter_nombre} </option> ) 
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <Botones enlace='/Usuarios'/>    
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
export default Creaarrol;