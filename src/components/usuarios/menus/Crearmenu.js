import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import TituloModal from '../../../comunes/TituloModal';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Breadcrumb from '../../../layout/Breadcrumb';
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

class Crearpais extends Component {
    Codigo = React.createRef(); 
    Nombre = React.createRef(); 
    state = { tabe: {}, status: null };
    componentDidMount() { }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = { 
            "men_nombre": document.forma.Nombre.value, 
            "men_ruta": document.forma.Ruta.value,
            "men_orden": document.forma.Orden.value, 
            "men_categoria": document.forma.Categoria.value, 
            "men_ordenc": document.forma.Ordenm.value 
        }
        guarda(tabe, "menus", "Menu", "/Menus");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26") { return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/Menus"/>; }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"Menus", name:"Menus"},{href:"#", name:"Agregar menú"}];
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

                                         <TituloModal titulo="Agregar Menú"/>
                                        <div className='row'>
                                            <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" col="6" />
                                            <Fila nombre="Ruta" refer="Ruta" tipo="1" arreglo=""  col="3"/>
                                            <Fila nombre="Orden" refer="Orden" tipo="2" arreglo="" col="3" />
                                        </div>

                                        <div className='row'>
                                            <Fila nombre="Categoria" refer="Categoria" tipo="1" arreglo=""  col="6"/>
                                            <Fila nombre="Orden Categoría" refer="Ordenm" tipo="2" arreglo="" defecto={this.state.men_orden} col="6" />
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
export default Crearpais;