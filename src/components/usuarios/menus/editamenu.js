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
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Menus"/>
                <Script2 id={this.props.match.params.id} tabla="menus" devuelvedatos={this.dato} />
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Editar Menus</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" defecto={this.state.men_nombre} />
                                        <Fila nombre="Ruta" refer="Ruta" tipo="1" arreglo="" defecto={this.state.men_ruta} />
                                        <Fila nombre="Orden" refer="Orden" tipo="2" arreglo="" defecto={this.state.men_orden} />
                                        <Fila nombre="Categoria" refer="Categoria" tipo="1" arreglo="" defecto={this.state.men_categoria}  />
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
export default editamenu;