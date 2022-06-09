import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';
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
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"Paises", name:"Paises"},{href:"#", name:"Crear país"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-mainpanel">
                    
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm mt-3" style={{width: '700px'}}>
                                    <div className="modal-body p-6">

                                        <TituloModal titulo="Agregar País"/>
                                        <div className='row'>
                                            <Fila nombre="Código" refer="Codigo" tipo="1" arreglo=""  col="4"/>
                                            <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo=""  col="8"/>
                                        </div>
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