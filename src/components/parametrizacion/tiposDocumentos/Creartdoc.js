import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import ClasificaDocs from '../../../helpers/clasificadocs';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

class Creartipd extends Component {
    state = { roles: {}, status: null, apro: ["Aprobado", "Revisado, Aprobado", "Proyectado, Revisado, Aprobado"]};
    componentDidMount() { }
    guardar = (e) =>{
        e.preventDefault();
        const nuev = {
            tid_nombre: document.forma.Codigo.value, 
            tid_clasifica: document.forma.clas.value,
            tid_aprobacion: document.forma.aprob.value
        }
        guarda(nuev, "tiposdocumentos", "Tipos de documentos", "/Tipos-docuemntos");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){ return <Redirect to="/Tipos-docuemntos"/>; }
        return (
            <div>
                <Header/>
                <Menulat/>
                <Titulo titulo="Agregar Tipos docuemntos"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Tipo docuemnto</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <ClasificaDocs/>
                                        <Fila nombre="Tipo Documento" refer="Codigo" tipo="1" arreglo=""  />
                                        <Fila nombre="Tipo aporbacion" refer="aprob" tipo="6" arreglo={this.state.apro}  />
                                    </div>
                                </div>
                                <Botones enlace='/Tipos-docuemntos'/>    
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Creartipd;