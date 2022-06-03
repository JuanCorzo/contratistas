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
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"macrozonas", name:"macrozonas"},{href:"editarmacr", name:"Editar macrozona"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Macrozonas"/>
                <div className="am-mainpanel">
                    <Breadcrumb links={linksBreadcrumb}></Breadcrumb>
                        <div className="card pd-20 pd-sm-40">
                          <Script2 id={this.props.match.params.id} tabla="macrozonas" devuelvedatos={this.dato} />
                            <h6 className="card-body-title">Editar Macrozonas</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <Fila nombre="Nombre macrozona" refer="Rol" tipo="1" />
                                    </div>
                                    <Botones enlace='/macrozonas'/>    
                                </div>
                            </form>
                        </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default editamacr;