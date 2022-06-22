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


class editacapo extends Component {
    Rol = React.createRef(); 
    idc = null;
    state = { rols:[], status: null, dato:"" };
    componentDidMount() { 
        this.idc=this.props.match.params.id; 
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = { 
            cla_codigo: document.forma.Codigo.value,
            cla_nombre: document.forma.Nombre.value
        }
        actualiza(tabe, "clasificacionesaportantes", "Clasificación aportantes", this.idc, "/clasificacionesaportantes");
        this.setState({ status: 'Ok'})
    }
    dato = (rols) => { 
        this.setState(rols);
        document.forma.Codigo.value=this.state[0].cla_codigo; 
        document.forma.Nombre.value=this.state[0].cla_nombre;  
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8"  && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/clasificacionesaportantes"/>;}
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../clasificacionesaportantes", name:"Clasificación de aportantes"},{href:"#", name:"Editar clasificación de aportantes"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                        
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <Script2 id={this.props.match.params.id} tabla="clasificacionesaportantes" devuelvedatos={this.dato} />
                            
                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm mt-3" style={{width: '700px'}}>
                                    <div className="modal-body p-6">

                                        <TituloModal titulo="Editar Clasificación de Aportante"/>

                                        <div className='row'>
                                            <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" defecto={this.state.cla_codigo} col="4" />
                                            <Fila nombre="Clasificación" refer="Nombre" tipo="1" arreglo="" defecto={this.state.cla_nombre} col="8"/>
                                        </div>
                                    </div>
                                    <Botones enlace='/clasificacionesaportantes'/>    
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
export default editacapo;