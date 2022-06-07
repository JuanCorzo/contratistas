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
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 


class editatent extends Component {
    Rol = React.createRef(); 
    idc = null;
    state = { rols:[], status: null, dato:"" };
    componentDidMount() { this.idc=this.props.match.params.id; }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = {  
            tad_codigo: document.forma.Codigo.value,
            tad_descripcion: document.forma.Descripcion.value 
        }
        actualiza(tabe, "tipoadscrita", "Tipos entidades", this.idc, "/Tipos-entidades");
        this.setState({ status: 'Ok'})
    }
    dato = (rols) => { 
        this.setState(rols);
        document.forma.Codigo.value=this.state[0].tad_codigo; 
        document.forma.Descripcion.value=this.state[0].tad_descripcion;  
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/Tipos-entidades"/>;}
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../tipos-Entidades", name:"Orden entidades"},{href:"#", name:"Editar orden de entidades"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Orden Entidades"/>
                <div className="am-mainpanel">
                        
                        <div className="card pd-20 pd-sm-40">
                          <Script2 id={this.props.match.params.id} tabla="tipoadscrita" devuelvedatos={this.dato} />
                          <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm" style={{width: '700px'}}>
                                    <div className="modal-body pd-20">
                                    
                                    <TituloModal titulo="Editar Orden de Entidades"/>

                                    <div className='row'>
                                        <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" defecto={this.state.tad_codigo}  col="6"/>
                                        <Fila nombre="Descripción" refer="Descripcion" tipo="1" arreglo="" defecto={this.state.tad_descripcion} col="6"/>
                                    </div>
                                    </div>
                                    <Botones enlace='/Tipos-entidades'/>    
                                </div>
                            </form>
                        </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default editatent;