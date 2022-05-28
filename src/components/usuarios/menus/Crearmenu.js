import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
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
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar País"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Menú</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo=""  />
                                        <Fila nombre="Ruta" refer="Ruta" tipo="1" arreglo=""  />
                                        <Fila nombre="Orden" refer="Orden" tipo="2" arreglo=""  />
                                        <Fila nombre="Categoria" refer="Categoria" tipo="1" arreglo=""  />
                                        <Fila nombre="Orden Categoría" refer="Ordenm" tipo="2" arreglo="" defecto={this.state.men_orden} />
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