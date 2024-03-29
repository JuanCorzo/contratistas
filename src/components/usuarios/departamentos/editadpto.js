import React, { Component } from 'react';
import Territorial from '../../../helpers/territoriales';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';

const cookies = new Cookies(); 

class editadpto extends Component {
    idc = null;
    state = { tabe: {}, cons:[], status: null };
    componentDidMount() {
        this.idc=this.props.match.params.id;
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe1 = {
            "territorial_idterritorial": document.forma.idterritorial.value,
            "dep_codigo": document.forma.Codigo.value,
            "dep_nombre": document.forma.Nombre.value,
        }
        actualiza(tabe1, "departamentos", "Departamento", this.idc, "/Departamentos");
        this.setState({ status: 'Ok'})
    }
    dato = (tabe) => { 
        this.setState(tabe); 
        document.forma.idterritorial.value=this.state[0].idterritorial; 
        document.forma.Codigo.value=this.state[0].dep_codigo; 
        document.forma.Nombre.value=this.state[0].dep_nombre; 
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26")
        {
            return <Redirect to="./"/>;
        }
        if(this.state.status==="Ok"){
            return <Redirect to="/Departamentos"/>;
        }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../departamentos", name:"Departamentos"},{href:"#", name:"Editar departamento"}];
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

                                        <Script2 id={this.props.match.params.id} tabla="departamentos" devuelvedatos={this.dato} />
                                        <TituloModal titulo="Editar Departamento"/>
                                        
                                        <div className='row'>    
                                            <Territorial valor={this.state.idterritorial} col="5"/>
                                            <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" defecto={this.state.dep_codigo} col="3"/>
                                            <Fila nombre="Departamento" refer="Nombre" tipo="1" arreglo="" defecto={this.state.dep_nombre} col="4"/>
                                        </div>
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
export default editadpto;