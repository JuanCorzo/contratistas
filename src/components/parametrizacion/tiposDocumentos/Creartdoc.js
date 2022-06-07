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
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';
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
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"Tipos-docuemntos", name:"Tipos documentos"}, {href:"#", name:"Agregar tipo de documento"}];
        return (
            <div>
                <Header/>
                <Menulat/>
                <Titulo titulo="Agregar Tipos docuemntos"/>
                <div className="am-mainpanel">
                    
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>
                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm" style={{width: '700px'}}>
                                    <div className="modal-body pd-20">
                                        <TituloModal titulo="Agregar Tipo de documento"/>
                                        
                                        <div style={{paddingRight:"1em",paddingLeft:"1em"}}>
                                       
                                        </div>
                                        <div className='row'>
                                            <ClasificaDocs col="6"/>
                                            <Fila nombre="Tipo Documento" refer="Codigo" tipo="1" arreglo=""  col="6"/>
                                        </div>
                                        <div className='row'>   
                                            <Fila nombre="Tipo aporbacion" refer="aprob" tipo="6" arreglo={this.state.apro} col="6" />
                                        </div>
                                    </div>
                                    <Botones enlace='/Tipos-docuemntos'/>    
                                </div>
                                
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