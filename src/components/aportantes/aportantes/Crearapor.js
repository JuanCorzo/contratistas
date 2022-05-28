import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Departamento from '../../../helpers/municipios';
import Paramsaporta from '../../../helpers/aportantesfil';
import axios from 'axios';
import global from '../../../Global';
const cookies = new Cookies(); 

class Crearmuni extends Component {
    state = {
        muni: {},
        cons:[],
        tabe: null,
        status: null
    };
    componentDidMount() {}
    guardar = (e) =>{
        e.preventDefault();
      axios.get(global.url + "aportantes/territoriales/terri2", global.autentica ).then((res) => {
          var taba = res.data;
          var tabe = taba[0].idaportantes+1;
          const apor = {
            "idaportantes": tabe,
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
          guarda(apor, "aportantes", "Entidad Aportante", "/aportantes");
          this.setState({ status: 'Ok'})
      }); 
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){ return <Redirect to="/aportantes"/>; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar Entidad Aportante"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Entidad Aportante</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Departamento valor={this.state.iddepartamentos}/>
                                    <Paramsaporta valor1="" valor2="" valor3="3" valor4="" />
                                    <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" />
                                    <Fila nombre="Email" refer="Email" tipo="3" arreglo="" />
                                    <Fila nombre="Teléfono" refer="Celular" tipo="1" arreglo="" />
                                    <Fila nombre="Identificación" refer="Identificacion" tipo="1" arreglo="" />
                                    <Fila nombre="Sufijo" refer="Sufijo" tipo="1" arreglo="" />
                                    <Fila nombre="Dirección" refer="Direccion" tipo="1" arreglo="" />
                                    <Fila nombre="Representante legal" refer="Fax" tipo="1" arreglo="" />
                                    <Fila nombre="Identificación representante legal" refer="Tippoi" tipo="1" arreglo="" />
                                    <Fila nombre="Promedio IBC entidad" refer="Firma" tipo="2" arreglo="" />
                                    <Fila nombre="Promedio empleados entidad" refer="Emple" tipo="2" arreglo="" />
                                    <Fila nombre="Sucursal" refer="sucur" tipo="1" arreglo="" />
                                </div>
                                <Botones enlace='/aportantes'/>    
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