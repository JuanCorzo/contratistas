import React, { Component } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo3 from '../../../comunes/Titulo3';
import axios from 'axios';
import global from '../../../Global';
import Fila3 from '../../../comunes/fila3';
import MaterialTable from 'material-table';
import definiciones from '../../../comunes/definiciones';
import PatchedPagination from '../../../comunes/PatchedPagination';
import Moment from 'react-moment';
import Descargado from '../../../comunes/descargardocs';

const cookies = new Cookies(); 
class fichaaportante extends Component {
    idc=null 
    state = { rols:[], enti:[], docs:[], status: null, ejec:[] };
    
    ir = (i) => {
        //e.preventDefault();
    }
        
    componentDidMount() {

      this.idc=this.props.match.params.id;
      var tabla2="responsables/aportante/"+this.idc;
      this.setState({ idc:this.idc });
      axios.get(global.url + tabla2, global.autentica ).then((res) => {
          const rols = res.data;
          this.setState({ rols });
      });        
      axios.get(global.url + "documentosaportantes/aportante/"+this.idc, global.autentica ).then((res) => {
           const docs = res.data;
           this.setState({ docs });
      });        
      axios.get(global.url + "aportantes/" + this.idc, global.autentica ).then((res) => {
          const enti = res.data;
          const nit=enti[0].apo_identificacion;
          this.setState({ enti });
          axios.get(global.url + "aportantes/ejecutoras/" + nit, 
          global.autentica ).then((res) => {
              const ejec = res.data;
              this.setState({ ejec });
          });
      });
    }
    dato = (rols) => { this.setState({ rols }); }
    render() {
        const columnas = [
            { title: 'Nombre', field:'res_nombre', sortable: true},
            { title: 'Cargo', field:'res_cargo', sortable: true},
            { title: 'Teléfono', field:'res_email', sortable: true},
            { title: 'Email', field:'res_telefono', sortable: true},
          ]
          const columnas2 = [
            { title: 'Registro', field:'apo_fecha', sortable: true, type: 'date',
            render: row => <Moment format="DD MMM YYYY">{ row["apo_fecha"]}</Moment>},
            { title: 'Clasificación', field: 'tid_clasifica', sortable: true },
            { title: 'Documento', field: 'tid_nombre', sortable: true },
            { title: 'Anexos', field:'idc', sortable: false, width: "10%",
            render: row =>  ( <Descargado docid={row["iddocumentosaportantes"]} /> )}
          ]
          const columnas3 = [
            { title: 'NIT', field:'apo_identificacion', sortable: true},
            { title: 'Sufijo', field: 'apo_sufijo', sortable: true },
            { title: 'Entidad', field: 'apo_nombre', sortable: true },
            { title: 'Ver ficha', field:'idaportantes', sortable: false, width: "10%",
            render: row =>  ( <NavLink className="btn btn-primary"
            style={{"transform":"scale(0.8)", "padding":"5px", "width":"70px"}}
            to={"/ficha1/"+row["idaportantes"]}><i className="icon ion-eye"></i> Ver</NavLink> )}
          ]
    
        if(!cookies.get("idroles")){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/responsables"/>;}
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-mainpanel">
                <div className="card pd-20 pd-sm-40">
                {
                  this.state.enti.map((sin, i) => {
                  return (
                    <React.Fragment key={i}>
                    <div className='row'>
                    <div className='col-lg-12 fflitro mt-3 lineacolor-card '>
                        <div className='xill20'>
                        <Titulo3 titulo={ 
                        sin.apo_sufijo===""?( sin.apo_nombre + " NIT: " + sin.apo_identificacion):
                        sin.apo_sufijo==="0"?( sin.apo_nombre + " NIT: " + sin.apo_identificacion)
                        :(sin.apo_nombre + " NIT: " + sin.apo_identificacion +"-"+sin.apo_sufijo )
                        }/>
                        </div>
                   
                        <div className="row fflitro">
                        <Fila3 ancho="col-lg-3 izqq1 textrse" valor={
                            sin.apo_sufijo===""?( sin.apo_identificacion)
                            :sin.apo_sufijo==="0"?( sin.apo_identificacion)
                            :( sin.apo_identificacion +"-"+sin.apo_sufijo )
                        } nombre="Número de itentificación"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse" valor={sin.apo_nombre } nombre="Nombre entidad"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.ter_macrozona } nombre="Macrozona"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.ter_nombre } nombre="Territorial"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.dep_codigo +"-"+sin.dep_nombre } nombre="Departamento"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.ciu_codigo +"-"+ sin.ciu_nombre } nombre="Municipio"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.sec_nombre } nombre="Naturaleza entidad"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.cla_nombre } nombre="Clasificación aportante"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.tad_descripcion } nombre="Orden Aportante"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.apo_direccion } nombre="Dirección"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.apo_email } nombre="Email"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.apo_celular } nombre="Teléfono"></Fila3>

                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.apo_replegal } nombre="Representante legal"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.apo_ccreplegal } nombre="Identificación representante legal"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.apo_promedioibc } nombre="Promedio IBC entidad"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.apo_empleados } nombre="Empleados promedio en la entidad"></Fila3>
                        <Fila3 ancho="col-lg-3 izqq1 textrse1" valor={sin.apo_sucursal } nombre="Sucursal"></Fila3>
                        </div>    
                    </div>
                    </div>
                    </React.Fragment>    
                    )
                })
            }<br></br>
            <div className="row">
                <div className="col-lg-6 fflitro">
                    <Titulo3 titulo="Documentos Anexos" volver="0"/>
                    <div className="table-wrapper" id="tablas">
                        <MaterialTable 
                        components={{
                            Pagination: PatchedPagination,
                        }}
                        columns={columnas2} data={this.state.docs}
                        style={{"padding": "1px 1px 1px 1px"}}
                        title="" options={{ actionsColumnIndex: -1,  rowStyle: { fontSize: 12 } }}
                        localization={{ header:{ actions: 'Acciones'}}}
                        icons={definiciones}
                        ></MaterialTable>
                    </div>
                </div>
                <div className="col-lg-6 fflitro">
                    <Titulo3 titulo="Personas Reponsables" volver="0"/>
                    <div className="table-wrapper" id="tablas">
                        <MaterialTable 
                        components={{
                            Pagination: PatchedPagination,
                        }}
                        columns={columnas} data={this.state.rols} title=""
                        style={{"padding": "1px 1px 1px 1px"}}
                        options={{ actionsColumnIndex: -1, rowStyle: { fontSize: 12 } }}
                        localization={{ header:{ actions: 'Acciones'}}}
                        icons={definiciones}
                        ></MaterialTable>
                    </div>
                </div>
            </div><br></br>
            <div className="row">
                <div className="col-lg-12 fflitro">
                    <Titulo3 titulo="Entidades Ejecutoras del gasto" volver="0"/>
                    <div className="table-wrapper" id="tablas">
                        <MaterialTable 
                        components={{
                            Pagination: PatchedPagination,
                        }}
                        columns={columnas3} data={this.state.ejec} 
                        style={{"padding": "1px 1px 1px 1px"}}
                        title="" options={{ actionsColumnIndex: -1, rowStyle: { fontSize: 12 } }}
                        localization={{ header:{ actions: 'Acciones'}}}
                        icons={definiciones}
                        ></MaterialTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
</div>
        );
    }
}
export default fichaaportante;