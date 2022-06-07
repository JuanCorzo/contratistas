import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import TituloModal from '../../../comunes/TituloModal';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Breadcrumb from '../../../layout/Breadcrumb';
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 


class editarol extends Component {
    Rol = React.createRef(); 
    idc = null;
    state = { rols:[], status: null, dato:"" };
    componentDidMount() { this.idc=this.props.match.params.id;
        cookies.set("revision", "No", {path:"/"});
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = { idroles: this.idc, rol_nombre: document.forma.Rol.value }
        actualiza(tabe, "roles", "Rol", this.idc, "/Roles");
        this.setState({ status: 'Ok'})
    }
    dato = (rols) => { 
        this.setState(rols); 
        document.forma.Rol.value=this.state[0].rol_nombre; 
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/Roles"/>;}
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../roles", name:"Roles"},{href:"../editarol", name:"Editar rol"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Rol"/>
                <div className="am-mainpanel">
                       
                        <div className="card pd-20 pd-sm-40">
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>
                          <Script2 id={this.props.match.params.id} tabla="roles" devuelvedatos={this.dato} />
                            
                            <form  name="forma" onSubmit={this.guardar} className="center-div">

                                <div className="modal-content tx-size-sm"  style={{width: '700px'}} >

                                    <div className="modal-body pd-20">

                                        <TituloModal titulo="Editar Rol"/>

                                        <Fila nombre="Nombre rol" refer="Rol" tipo="1" col="12" defecto={this.state.rol_nombre}/>
                                    </div>
                                    
                                    <Botones enlace='/Roles'/>    
                                </div>
                            </form>
                        </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default editarol;