import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Documentos from '../../../helpers/docsportantes';
import { Redirect, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

class Crearmuni extends Component {
    state = { muni: {}, cons:[], cargos:['Talento humano', 'Pagador', 
    'Responsable de presupuesto', 'Responsable liquidación nómina',  
    'Responsable jurídico'], status: null, idc:null };
    componentDidMount() {
        var idc=this.props.match.params.id;
        this.setState({ idc });
    }
    guardar = (e) =>{
        e.preventDefault();
       
        /* const tabe = {
            "aportantes_idaportantes": this.state.idc, 
            "res_nombre": document.forma.Nombre.value, 
            "res_identificacion": document.forma.Identificacion.value, 
            "res_cargo": document.forma.Cargo.value, 
            "res_telefono": document.forma.Celular.value, 
            "res_email": document.forma.Email.value, 
            "res_fecha": document.forma.Fecha.value 
        }
        guarda(tabe, "documentosaportantes", "Anexo");*/
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){ return <Redirect to="/aportantes"/>; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar Anexo"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar documento anexo</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <Documentos nombre="Documento" aport={this.state.idc} tipo="" />
                                    </div> 
                                    <div className="modal-footer">
                                        <NavLink className="btn btn-secondary pd-x-20" to="/aportantes">Cancelar</NavLink>
                                    </div>
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