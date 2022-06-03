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
import Breadcrumb from '../../../layout/Breadcrumb';
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 


class editaestn extends Component {
    Rol = React.createRef(); 
    idc = null;
    state = { rols:[], status: null, dato:"" };
    componentDidMount() { this.idc=this.props.match.params.id; }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = { idroles: this.idc, est_codigo: document.forma.Codigo.value,
        est_nombre: document.forma.Nombre.value, est_descripcion: document.forma.Desc.value  }
        actualiza(tabe, "estructuranomnina", "Factor salarial", this.idc, "/EstructuraNomina");
        this.setState({ status: 'Ok'})
    }
    dato = (rols) => { 
        this.setState(rols);
        document.forma.Codigo.value=this.state[0].est_codigo; 
        document.forma.Nombre.value=this.state[0].est_nombre; 
        document.forma.Desc.value=this.state[0].est_descripcion; 
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/EstructuraNomina"/>;}
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"EstructuraNomina", name:"Factores salariales"},{href:"editaestn", name:"Editar Factores salariales"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Factor Salarial"/>
                <div className="am-mainpanel">
                        <Breadcrumb links={linksBreadcrumb}></Breadcrumb>   
                        <div className="card pd-20 pd-sm-40">
                          <Script2 id={this.props.match.params.id} tabla="estructuranomnina" devuelvedatos={this.dato} />
                            <h6 className="card-body-title">Editar Factor Salarial</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" defecto={this.state.est_codigo}  />
                                    <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" defecto={this.state.est_nombre} />
                                    <Fila nombre="Descripción" refer="Desc" tipo="1" arreglo="" defecto={this.state.est_descripcion} />
                                    
                                    </div>
                                    <Botones enlace='/EstructuraNomina'/>    
                                </div>
                            </form>
                        </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default editaestn;