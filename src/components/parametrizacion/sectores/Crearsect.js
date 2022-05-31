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

class Crearsect extends Component {
    state = { roles: {}, status: null };
    componentDidMount() { }
    guardar = (e) =>{
        e.preventDefault();
        const nuev = {
            sec_codigo: document.forma.Codigo.value, 
            sec_nombre: document.forma.Nombre.value
        }
        guarda(nuev, "sectores", "Sectores", "/naturaleza-entidades");
        this.setState({ status: 'Ok'})
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){ return <Redirect to="/naturaleza-entidades"/>; }
        return (
            <div>
                <Header/>
                <Menulat/>
                    <div className='w-75 m-auto pt-5'> 
                        <Titulo titulo="Agregar Clasificación por tipo de NIT"/>
                        <div className="am-mainpanel">
                            <div className="am-pagebody">
                                <div className="card pd-20 pd-sm-40">
                                    <h6 className="card-body-title">Agregar Clasificación por tipo de NIT</h6>
                                    <form  name="forma" onSubmit={this.guardar}>
                                        <div className="modal-content tx-size-sm">
                                            <div className="modal-body pd-20">
                                                <Fila nombre="Código" refer="Codigo" tipo="1" arreglo=""  />
                                                <Fila nombre="Clasificación por tipo de NIT" refer="Nombre" tipo="1" arreglo="" />
                                            </div>
                                        </div>
                                        <Botones enlace='/naturaleza-entidades'/>    
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>    
                <Footer/>
            </div>
        );
    }
}
export default Crearsect;