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
import Pais from '../../../helpers/paises';
import Macrozona from '../../../helpers/macrozonas';
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';

const cookies = new Cookies(); 

class editaterr extends Component {
    idc = null;
    state = { tabe: {}, cons:[], status: null };
    componentDidMount() {
        this.idc=this.props.match.params.id;
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe1 = {
            "paises_idpaises": document.forma.idpais.value,
            "ter_cod": document.forma.Codigo.value,
            "ter_nombre": document.forma.Nombre.value,
            "ter_macrozona": document.forma.Macro.value
        }
        actualiza(tabe1, "territoriales", "Territorial", this.idc, "/territoriales");
        this.setState({ status: 'Ok'})
    }
    dato = (tabe) => { this.setState(tabe);
        console.log(tabe);
        document.forma.idpais.value=this.state[0].idpaises; 
        document.forma.Codigo.value=this.state[0].ter_cod; 
        document.forma.Nombre.value=this.state[0].ter_nombre; 
        document.forma.Macro.value=this.state[0].ter_macrozona; 
    }
    render() {
        if(cookies.get("idroles")!=="1"){ return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/territoriales"/>; }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../territoriales", name:"Territoriales"},{href:"#", name:"Editar territorial"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Territorial"/>
                <div className="am-mainpanel">
                     
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm" style={{width: '700px'}}>

                                    <div className="modal-body pd-20">
                                    
                                    <TituloModal titulo="Editar Territorial"/>
                                   
                                    <div className='row'>
                                        <Pais col="6"/>
                                        <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" defecto={this.state.ter_cod} col="6"/>
                                    </div>

                                    <div className='row'>
                                        <Fila nombre="Terrirorial" refer="Nombre" tipo="1" arreglo="" defecto={this.state.ter_nombre} col="6"/>
                                        <Macrozona col="6"/>
                                    </div>
                                </div>
                                <Botones enlace='/territoriales'/>    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
                <Script2 id={this.props.match.params.id} tabla="aportantes/territoriales" devuelvedatos={this.dato} />
            </div>
        );
    }
}
export default editaterr;