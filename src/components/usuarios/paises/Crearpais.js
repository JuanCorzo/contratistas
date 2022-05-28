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
        const tabe = { "pai_codigo": document.forma.Codigo.value, "pai_nombre": document.forma.Nombre.value }
        guarda(tabe, "paises", "País", "/Paises");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1") { return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/Paises"/>; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar País"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar País</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <Fila nombre="Código" refer="Codigo" tipo="1" arreglo=""  />
                                        <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo=""  />
                                    </div>
                                    <Botones enlace='/Paises'/>    
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