import React, { Component } from 'react';
import Roles from '../../../helpers/roles';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import TituloModal from '../../../comunes/TituloModal';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Script2 from '../../../scripts/scripts2';
import axios from 'axios';
import global from '../../../Global';
import Breadcrumb from '../../../layout/Breadcrumb';

const cookies = new Cookies();

class editausuario extends Component {
    idc = null;
    state = { role:[], usua:[], status: null, macr:[], terr:[] };
    componentDidMount() {
        this.idc=this.props.match.params.id;
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
            "usu_idmacrozona":macr,
            "usu_idterritorial": terr
        }
        actualiza(tabe, "usuarios", "Usuario", this.idc, "/Usuarios");
        this.setState({ status: 'Ok'})
    }
    dato = (usua) => { 
        this.setState(usua); 
        document.forma.Nombre.value=this.state[0].usu_nombre; 
        document.forma.Email.value=this.state[0].usu_email; 
        document.forma.irol.value=this.state[0].roles_idroles; 
        document.forma.Celular.value=this.state[0].usu_celular; 
        document.forma.Desde.value=this.state[0].usu_fechainicio.substr(0,10); 
        document.forma.Hasta.value=this.state[0].usu_fechafin.substr(0,10); 
        var macr=this.state[0].usu_idmacrozona;
        if(macr===1){ macr="Macrozona I"; }
        else if(macr===2){ macr="Macrozona II"; }
        else if(macr===3){ macr="Macrozona III"; }
        document.forma.Macro.value=macr; 
        document.forma.terr.value=this.state[0].usu_idterritorial; 
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/Usuarios"/>; }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../usuarios", name:"Usuarios"},{href:"#", name:"Editar Usuario"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">

                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                        
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm mt-3">
                                    <div className="modal-body p-6">

                                    <TituloModal titulo="Editar Usuario"/>

                                    
                                        <div className='row'>
                                            <Roles valor={this.state.idroles} col="4"/>
                                            <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" defecto={this.state.usu_nombre} id="" col="8"/>
                                        </div>
                                        <div className='row'>
                                            <Fila nombre="Email" refer="Email" tipo="3" arreglo="" id="" defecto={this.state.usu_email} col="6" />
                                            <Fila nombre="Contraseña" refer="Password" tipo="4" arreglo="" id="" defecto="" col="6" />
                                        </div>

                                        <div className='row'>
                                            <Fila nombre="Celular" refer="Celular" tipo="1" arreglo="" id="" defecto={this.state.usu_telefono} col="4"/>
                                            <Fila nombre="Activo desde" refer="Desde" tipo="7" arreglo="" id="" defecto={this.state.usu_telefono} col="4" />
                                            <Fila nombre="Activo hasta" refer="Hasta" tipo="7" arreglo="" id="" defecto={this.state.usu_telefono} col="4" />
                                        </div>
                                        
                                        <div className='row pt-2'>
                                            <div className="col-md-6 col-input-style">
                                                <label>Macrozonas</label>
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
                                            
                                            <div className="col-md-6 col-input-style">
                                                <label>Territotrial</label>
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
                                <Script2 id={this.props.match.params.id} tabla="usuarios" devuelvedatos={this.dato} />
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
export default editausuario;