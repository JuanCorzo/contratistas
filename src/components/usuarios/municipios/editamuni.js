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
import Departamento from '../../../helpers/departamentos';
import Breadcrumb from '../../../layout/Breadcrumb';

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
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"Municipios", name:"Municipios"},{href:"editamuni", name:"Editar municipio"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Municipio"/>
                <div className="am-mainpanel">
                <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Editar Municipio</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Departamento valor={this.state.iddepartamentos}/>
                                    <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" defecto={this.state.mun_codigo} />
                                    <Fila nombre="Nombre" refer="Municipio" tipo="1" arreglo="" defecto={this.state.mun_nombre} />
                                </div>
                                <Botones enlace='/Municipios'/>    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
                <Script2 id={this.props.match.params.id} tabla="ciudades" devuelvedatos={this.dato} />
            </div>
        );
    }
}
export default Crearmuni;