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

class Crearcapo extends Component {
    state = { roles: {}, status: null };
    componentDidMount() { }
    guardar = (e) =>{
        e.preventDefault();
        const nuev = {
            cla_codigo: document.forma.Codigo.value, 
            cla_nombre: document.forma.Nombre.value
        }
        guarda(nuev, "clasificacionesaportantes", "Clasificación aportantes", "/Clasificacion-aportantes");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){ return <Redirect to="/Clasificacion-aportantes"/>; }
        return (
            <div>
                <Header/>
                <Menulat/>
                <Titulo titulo="Agregar Clasificación de aportantes por obligatoriedad"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Clasificación de aportantes por obligatoriedad</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <Fila nombre="Código" refer="Codigo" tipo="1" arreglo=""  />
                                        <Fila nombre="Clasificación" refer="Nombre" tipo="1" arreglo="" />
                                    </div>
                                </div>
                                <Botones enlace='/Clasificacion-aportantes'/>    
                            </form>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Crearcapo;