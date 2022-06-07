import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import ClasificaDocs from '../../../helpers/clasificadocs';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 


class editatdoc extends Component {
    Rol = React.createRef(); 
    idc = null;
    state = { rols:[], status: null, dato:"", 
    apro: ["Aprobado", "Revisado, Aprobado", "Proyectado, Revisado, Aprobado"]};
    componentDidMount() { this.idc=this.props.match.params.id; }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = { 
            tid_nombre: document.forma.Codigo.value,
            tid_clasifica: document.forma.clas.value,
            tid_aprobacion: document.forma.aprob.value
        }
        actualiza(tabe, "tiposdocumentos", "Tipos de documentos", this.idc, "/Tipos-docuemntos");
        this.setState({ status: 'Ok'})
    }
    dato = (rols) => { 
        this.setState(rols);
        document.forma.Codigo.value=this.state[0].tid_nombre; 
        document.forma.clas.value=this.state[0].tid_clasifica; 
        document.forma.aprob.value=this.state[0].tid_aprobacion; 
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/Tipos-docuemntos"/>;}
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../tipos-docuemntos", name:"Tipos documentos"}, {href:"editatdoc/3", name:"Editar tipo de documento"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <Script2 id={this.props.match.params.id} tabla="tiposdocumentos" devuelvedatos={this.dato} />
                          
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>
                            
                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm mt-3" style={{width: '700px'}}>
                                    <div className="modal-body p-6">
                                        
                                        <TituloModal titulo="Editar Tipo de documento" col="12"/>

                                        <div className='row'>
                                            <ClasificaDocs col="6"/>
                                            <Fila nombre="Tipo Documento" refer="Codigo" tipo="1" arreglo="" defecto={this.state.tid_nombre} col="6"/>
                                        </div>
                                        <div className='row mt-4'>
                                            <Fila nombre="Tipo aporbacion" refer="aprob" tipo="6" arreglo={this.state.apro} defecto={this.state.tid_aprobacion} col="12" />
                                        </div>
                                    </div>
                                    <Botones enlace='/Tipos-docuemntos'/>    
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
export default editatdoc;