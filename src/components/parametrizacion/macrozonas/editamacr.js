import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';
const cookies = new Cookies(); 


class editamacr extends Component {
    Rol = React.createRef(); 
    idc = null;
    state = { rols:[], status: null, dato:"" };
    componentDidMount() { this.idc=this.props.match.params.id; }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = { idroles: this.idc, mac_nombre: document.forma.Rol.value }
        actualiza(tabe, "macrozonas", "Macrozona", this.idc, "/macrozonas");
        this.setState({ status: 'Ok'})
    }
    dato = (rols) => { 
        this.setState(rols); 
        document.forma.Rol.value=this.state[0].mac_nombre; 
    }
    render() {
        if(cookies.get("idroles")!=="1"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/macrozonas"/>;}
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../macrozonas", name:"Macrozonas"},{href:"#", name:"Editar macrozona"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            
                        <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                          <Script2 id={this.props.match.params.id} tabla="macrozonas" devuelvedatos={this.dato} />
                            
                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm mt-3" style={{width: '700px'}}>
                                    <div className="modal-body p-6">

                                        <TituloModal titulo="Editar Macrozona"/>

                                        <div className="row">
                                            <Fila nombre="Nombre macrozona" refer="Rol" tipo="1" col="12"/>
                                        </div>
                                    </div>
                                    <Botones enlace='/macrozonas'/>    
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
export default editamacr;