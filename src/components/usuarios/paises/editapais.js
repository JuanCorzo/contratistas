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
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';

const cookies = new Cookies(); 

class editapais extends Component {
    idc = null;
    state = { tabe: {}, status: null };
    componentDidMount() {
        this.idc=this.props.match.params.id;
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe1 = {
            "idpaises": this.idc,
            "pai_codigo": document.forma.Codigo.value,
            "pai_nombre": document.forma.Nombre.value
        }
        actualiza(tabe1, "paises", "Pais", this.idc, "/Paises");
        this.setState({ status: 'Ok'})
    }
    dato = (tabe) => { 
        this.setState(tabe); 
        document.forma.Codigo.value=this.state[0].pai_codigo; 
        document.forma.Nombre.value=this.state[0].pai_nombre; 
    }
    render() {
        if(cookies.get("idroles")!=="1")
        {
            return <Redirect to="./"/>;
        }
        if(this.state.status==="Ok"){
            return <Redirect to="/Paises"/>;
        }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../paises", name:"Paises"},{href:"#", name:"Editar país"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar País"/>
                <Script2 id={this.props.match.params.id} tabla="paises" devuelvedatos={this.dato} />
                <div className="am-mainpanel">
                    
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm" style={{width: '700px'}}>
                                    <div className="modal-body pd-20">
                                        
                                        <TituloModal titulo="Editar País"/>
                                        <div className='row'>
                                            <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" defecto={this.state.pai_codigo}  col="6"/>
                                            <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" defecto={this.state.pai_nombre}  col="6"/>
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
export default editapais;