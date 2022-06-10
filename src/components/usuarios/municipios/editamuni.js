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
import Departamento from '../../../helpers/departamentos';
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';

const cookies = new Cookies(); 

class Crearmuni extends Component {
    idc = null;
    state = { tabe: {}, cons:[], status: null };
    componentDidMount() {
        this.idc=this.props.match.params.id;
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe1 = {
            "departamentos_iddepartamentos": document.forma.Departamento.value,
            "ciu_codigo": document.forma.Codigo.value,
            "ciu_nombre": document.forma.Municipio.value
        }
        actualiza(tabe1, "ciudades", "Municipio", this.idc, "/Municipios");
        this.setState({ status: 'Ok'})
    }
    dato = (tabe) => { 
        this.setState(tabe); 
        document.forma.Municipio.value=this.state[0].ciu_nombre; 
        document.forma.Codigo.value=this.state[0].ciu_codigo; 
        document.forma.Departamento.value=this.state[0].iddepartamentos; 
    }

    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26")
        {
            return <Redirect to="./"/>;
        }
        if(this.state.status==="Ok"){
            return <Redirect to="/Municipios"/>;
        }
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../municipios", name:"Municipios"},{href:"#", name:"Editar municipio"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-mainpanel">
                

                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">

                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form  name="forma" onSubmit={this.guardar} className="center-div">
                                <div className="modal-content tx-size-sm mt-3" style={{width: '700px'}}>
                                    <div className="modal-body p-6">
                                    
                                    <TituloModal titulo="Editar Municipio"/>
                                    <Script2 id={this.props.match.params.id} tabla="ciudades" devuelvedatos={this.dato} />
                                    
                                    <div className='row'>
                                        <Departamento valor={this.state.iddepartamentos} col="12"/>
                                        <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" defecto={this.state.mun_codigo} col="4" />
                                        <Fila nombre="Nombre" refer="Municipio" tipo="1" arreglo="" defecto={this.state.mun_nombre} col="8"/>
                                    </div>
                                </div>
                                <Botones enlace='/Municipios'/>    
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
export default Crearmuni;