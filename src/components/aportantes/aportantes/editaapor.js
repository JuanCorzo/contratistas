import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Breadcrumb from '../../../layout/Breadcrumb';
import TituloModal from '../../../comunes/TituloModal';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Departamento from '../../../helpers/municipios';
import Paramsaporta from '../../../helpers/aportantesfil';

const cookies = new Cookies(); 

class editaapor extends Component {
    idc = null;
    state = { tabe: {}, cons:[], status: null };
    componentDidMount() {
        this.idc=this.props.match.params.id;
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe1 = {
            "apo_nombre": document.forma.Nombre.value, 
            "apo_email": document.forma.Email.value, 
            "apo_celular": document.forma.Celular.value, 
            "apo_identificacion": document.forma.Identificacion.value, 
            "apo_sufijo": document.forma.Sufijo.value, 
            "apo_direccion": document.forma.Direccion.value, 
            "apo_replegal": document.forma.Fax.value, 
            "apo_ccreplegal": document.forma.Tippoi.value, 
            "apo_promedioibc": document.forma.Firma.value, 
            "estructuranomina_idestructuranomina": document.forma.estn.value, 
            "clasificaaportantes_idclasificaaportantes": document.forma.clap.value, 
            "sectores_idsectores": document.forma.sect.value, 
            "ciudades_idciudades": document.forma.Municipio.value, 
            "tipoadscrita_idtipoadscrita": document.forma.tiad.value,
            "apo_sucursal": document.forma.Emple.value, 
            "apo_empleados": document.forma.sucur.value
        }
        actualiza(tabe1, "aportantes", "Entidad Aportante", this.idc, "/aportantes");
        this.setState({ status: 'Ok'})
    }
    dato = (tabe) => { 
        this.setState(tabe);
        document.forma.Departamento.value=this.state[0].iddepartamentos;
        document.forma.Municipio.value=this.state[0].idciudades;

        document.forma.clap.value=this.state[0].idclasificaaportantes;
        document.forma.estn.value=this.state[0].idestructuranomina;
        document.forma.sect.value=this.state[0].idsectores;
        document.forma.tiad.value=this.state[0].idtipoadscrita;

        document.forma.Nombre.value=this.state[0].apo_nombre; 
        document.forma.Email.value=this.state[0].apo_email; 
        document.forma.Celular.value=this.state[0].apo_celular; 
        document.forma.Identificacion.value=this.state[0].apo_identificacion; 
        document.forma.Sufijo.value=this.state[0].apo_sufijo; 
        document.forma.Direccion.value=this.state[0].apo_direccion; 
        document.forma.Fax.value=this.state[0].apo_replegal; 
        document.forma.Tippoi.value=this.state[0].apo_ccreplegal; 
        document.forma.Firma.value=this.state[0].apo_promedioibc; 
        document.forma.Emple.value=this.state[0].apo_empleados; 
        document.forma.sucur.value=this.state[0].apo_sucursal; 
    }

    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){ return <Redirect to="/aportantes"/>; }
        let linksBreadcrumb = [{href:"../inicio", name:"Inicio"}, {href:"../aportantes", name:"Listado de Entidades Aportantes"}, {href:"#", name:"Editar Aportante"}];

        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">

                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>

                            <form name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm mt-3">
                                    <div className="modal-body p-6">

                                        <TituloModal titulo="Editar Entidad Aportante"/> 

                                        <Departamento valor={this.state.iddepartamentos} col1="6" col2="6"/>
                                        <Paramsaporta valor1="" valor2="" valor3="" valor4="" />
                                        <div className="row mt-4">
                                            <Fila nombre="Identificación" refer="Identificacion" tipo="1" col="3" arreglo="" />
                                            <Fila nombre="Nombre" refer="Nombre" tipo="1" col="5" arreglo="" />
                                            <Fila nombre="Email" refer="Email" tipo="3" col="4" arreglo="" />
                                        </div>
                                        <div className="row mt-4">
                                            <Fila nombre="Teléfono" refer="Celular" tipo="1" col="3" arreglo="" />
                                            <Fila nombre="Sufijo" refer="Sufijo" tipo="12" col="2" arreglo="" />
                                            <Fila nombre="Dirección" refer="Direccion" tipo="1" col="7" arreglo="" />
                                        </div>
                                        <div className="row mt-4">
                                            <Fila nombre="Representante legal" refer="Fax" tipo="1" col="7" arreglo="" />
                                            <Fila nombre="Identificación representante legal" refer="Tippoi" tipo="1" col="5" arreglo="" />
                                        </div>
                                        <div className="row mt-4">
                                            <Fila nombre="Promedio IBC entidad" refer="Firma" tipo="2" col="4" arreglo="" />
                                            <Fila nombre="Promedio empleados entidad" refer="Emple" tipo="2" col="4" arreglo="" />
                                            <Fila nombre="Sucursal" refer="sucur" tipo="1" col="4" arreglo="" />
                                        </div>
                                    </div>
                                    <Botones enlace='/aportantes'/>    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
                <Script2 id={this.props.match.params.id} tabla="aportantes" devuelvedatos={this.dato} />
            </div>
        );
    }
}
export default editaapor;