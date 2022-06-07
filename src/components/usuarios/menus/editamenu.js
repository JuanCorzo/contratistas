import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import TituloModal from '../../../comunes/TituloModal';
import Breadcrumb from '../../../layout/Breadcrumb';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies(); 

class editamenu extends Component {
    idc = null;
    state = { tabe: {}, status: null };
    componentDidMount() {
        this.idc=this.props.match.params.id;
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe1 = {
            "idmenus": this.idc,
            "men_nombre": document.forma.Nombre.value, 
            "men_ruta": document.forma.Ruta.value,
            "men_orden": document.forma.Orden.value, 
            "men_categoria": document.forma.Categoria.value, 
            "men_ordenc": document.forma.Ordenm.value 
        }
        actualiza(tabe1, "menus", "Menu", this.idc, "/Menus");
        this.setState({ status: 'Ok'})
    }
    dato = (tabe) => { 
        this.setState(tabe); 
        document.forma.Nombre.value=this.state[0].men_nombre; 
        document.forma.Ruta.value=this.state[0].men_ruta; 
        document.forma.Orden.value=this.state[0].men_orden; 
        document.forma.Categoria.value=this.state[0].men_categoria; 
        document.forma.Ordenm.value=this.state[0].men_ordenc; 

    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26")
        {
            return <Redirect to="./"/>;
        }
        if(this.state.status==="Ok"){
            return <Redirect to="/menus"/>;
        }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../menus", name:"Menus"},{href:"#", name:"Eitar menú"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Menus"/>
                <Script2 id={this.props.match.params.id} tabla="menus" devuelvedatos={this.dato} />
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">

                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm" style={{width: '700px'}}>
                                    <div className="modal-body pd-20">

                                        <TituloModal titulo="Editar Menú"/>

                                        <div className='row'>
                                            <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" defecto={this.state.men_nombre} col="6"/>
                                            <Fila nombre="Ruta" refer="Ruta" tipo="1" arreglo="" defecto={this.state.men_ruta} col="3"/>
                                            <Fila nombre="Orden" refer="Orden" tipo="2" arreglo="" defecto={this.state.men_orden} col="3"/>
                                        </div>
                                        <div className='row'>
                                            <Fila nombre="Categoria" refer="Categoria" tipo="1" arreglo="" defecto={this.state.men_categoria} col="6" />
                                            <Fila nombre="Orden Categoría" refer="Ordenm" tipo="2" arreglo="" defecto={this.state.men_orden} col="6"/>
                                        </div>
                                    </div>
                                    <Botones enlace='/Menus'/>    
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
export default editamenu;