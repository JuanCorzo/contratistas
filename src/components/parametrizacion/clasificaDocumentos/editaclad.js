import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 


class editaclad extends Component {
    Rol = React.createRef(); 
    idc = null;
    state = { rols:[], status: null, dato:"" };
    componentDidMount() { this.idc=this.props.match.params.id; }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = { idroles: this.idc, cld_nombre: document.forma.Rol.value }
        actualiza(tabe, "clasificas", "Clasificación documentos", this.idc, "/clasificas");
        this.setState({ status: 'Ok'})
    }
    dato = (rols) => { 
        this.setState(rols); 
        document.forma.Rol.value=this.state[0].cld_nombre; 
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/clasificas"/>;}
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../clasificas", name:"Clasificación Documentos"}, {href:"#", name:"Editar Clasificación Documentos"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <Script2 id={this.props.match.params.id} tabla="clasificas" devuelvedatos={this.dato} />
                            
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm mt-3" style={{width: '700px'}}>
                                    <div className="modal-body p-6">

                                        <TituloModal titulo="Editar clasificación de documentos"/>
                                        <div className='row'>
                                            <Fila nombre="Nombre clasificación" refer="Rol" tipo="1" col="12"/>
                                        </div>
                                    </div>
                                    <Botones enlace='/clasificas'/>    
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
export default editaclad;