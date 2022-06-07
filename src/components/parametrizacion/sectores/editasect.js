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


class editasect extends Component {
    Rol = React.createRef(); 
    idc = null;
    state = { rols:[], status: null, dato:"" };
    componentDidMount() { this.idc=this.props.match.params.id; }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = {  
            sec_codigo: document.forma.Codigo.value,
            sec_nombre: document.forma.Nombre.value 
        }
        actualiza(tabe, "sectores", "sectores", this.idc, "/naturaleza-entidades");
        this.setState({ status: 'Ok'})
    }
    dato = (rols) => { 
        this.setState(rols);
        document.forma.Codigo.value=this.state[0].sec_codigo; 
        document.forma.Nombre.value=this.state[0].sec_nombre;  
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/naturaleza-entidades"/>;}
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../naturaleza-entidades", name:"Clasificación por NIT"},{href:"#", name:"Editar clasificación por tipo de NIT"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Clasificación por tipo de NIT"/>
                <div className="am-mainpanel">
                        
                        <div className="card pd-20 pd-sm-40">
                          <Script2 id={this.props.match.params.id} tabla="sectores" devuelvedatos={this.dato} />

                          <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm" style={{width: '700px'}}>
                                    <div className="modal-body pd-20">

                                    <TituloModal titulo="Editar clasificación por tipo de NIT"/>
                                    <div className='row'>
                                        <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" defecto={this.state.sec_codigo}  col="6"/>
                                        <Fila nombre="Clasificación por tipo de NIT" refer="Nombre" tipo="1" arreglo="" defecto={this.state.sec_nombre} col="6"/>
                                    </div>
                                    </div>
                                    <Botones enlace='/naturaleza-entidades'/>    
                                </div>
                            </form>
                        </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default editasect;