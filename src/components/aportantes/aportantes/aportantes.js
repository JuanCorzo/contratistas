import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import { Redirect, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MaterialTable from 'material-table';
import definiciones from '../../../comunes/definiciones';
import FiltrosConsulta from '../comunes/filtrosConsultas';
import EncTabla from '../../../comunes/EncTabla';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import axios from 'axios';
import global from '../../../Global';
import swal from 'sweetalert';
const cookies = new Cookies(); 

class aportanes extends Component {
    state = { tabe:[], status: null, direc: "" };
    componentDidMount() {}
    elimina = (id) => {
      swal({
        title: "Está seguro?", text: "Una vez lo elimine no podrá recuperarlo!",
        icon: "warning", buttons: true, dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(global.url + "aportantes/" + id, 
          global.autentica)
          .then((res) => { 
              const current = new Date();
              const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;      
              const tablal =  "aportantes id:" + id; 
              const tabe = { 
                "log_fecha": date, 
                "log_accion": "Eliminar",
                "log_objeto": tablal, 
                "log_idusuarios": cookies.get("idusuarios")
              }
              axios.post(global.url + "logs", tabe,  global.autentica);
              swal("Registro Eliminado", "Se ha eliminado el registro", "success"); 
          });
        } else {
          swal("Eliminación cancelada");
        }
      }).catch((error) => {
        console.log(error);
        swal("Error al eliminar", "Hubo un error al intentar eliminar el registro", "error");
      });

    }
    dato = (tabe) => { this.setState({ tabe });  }
    enviar = (id) => { this.setState({ direc: id }) }
    render() {
        if(!cookies.get("idroles")) { return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/aportantes"/>; }
        if(this.state.direc!==""){return <Redirect to={this.state.direc}/>;}
        const columnas = [
          { title: 'NIT', headerStyle: { "text-align":"center", "padding":"0px"}, field:'apo_identificacion', sortable: true, width: "10%",
            render: row =>  (
              row["apo_sufijo"]===""?( <React.Fragment>{ row["apo_identificacion"]}</React.Fragment>) :
              row["apo_sufijo"]==="0"?( <React.Fragment>{ row["apo_identificacion"]}</React.Fragment>) :
              ( <React.Fragment><table><tr><td>{row["apo_identificacion"]}-</td><td>{row["apo_sufijo"]}</td></tr></table></React.Fragment>)
            )
          },
          { title: 'Entidad', headerStyle: { "text-align":"center", "padding":"0px"}, field:'apo_nombre', sortable: true, width: "20%" },
          { title: 'Municipio', headerStyle: { "text-align":"center", "padding":"0px"}, field:'ciu_nombre', sortable: true, width: "10%" },
          { title: 'Departamento', headerStyle: { "text-align":"center", "padding":"0px"}, field:'dep_nombre', sortable: true, width: "15%" },
          { title: 'Territorial', headerStyle: { "text-align":"center", "padding":"0px"}, field:'ter_nombre', sortable: true, width: "15%" },
          { title: 'Macrozona', headerStyle: { "text-align":"center", "padding":"0px"}, field:'ter_macrozona', sortable: true, width: "25%",
          render: row =>  ( <div className='texpeq'>{row["ter_macrozona"]}</div> )
          },
        ]
        return (
            <div className='m-auto' style={{width: "100%", paddingLeft: "6em",paddingRight: "6em", paddingTop: "2em"}}>
                <Header></Header>
                <Menulat></Menulat>
                  <div>
                    <div className="am-mainpanel">
                      <div className="card pd-20 pd-sm-40">
                      { 
                        cookies.get("idroles")==="1" || cookies.get("idroles")==="3"? (
                        <EncTabla titulo="Entidades Aportantes" link="/Crearapor" titulo2="Aportantes" />
                        ): ( <h6 className="card-body-title">Entidades Aportantes</h6> )
                      }
                        <FiltrosConsulta devuelvedatos={this.dato} titulo=''/><br></br>
                        { 
                        cookies.get("idroles")==="1" || cookies.get("idroles")==="3"? (
                        <MaterialTable columns={columnas} 
                        style={{"padding": "1px 1px 1px 1px", "fontSize": "12px"}}
                        data={this.state.tabe} title="Entidades aportantes"
                          actions={[
                          { icon: () => <Edit style={{"transform":"scale(0.8)"}} />, tooltip: 'Editar', 
                            onClick: (event, rowData)=>{ this.enviar("editaapor/" + rowData.idaportantes); }
                          },
                          { icon: () => <DeleteOutline style={{"transform":"scale(0.8)"}} />, tooltip: 'Eliminar', onClick: (event, rowData)=>this.elimina(rowData.idaportantes) }
                          ]}
                          options={{ actionsColumnIndex: -1, rowStyle: { fontSize: 13,}}}
                          localization={{ header:{ actions: 'Acciones'}}}
                          icons={definiciones}
                          detailPanel={[
                            {
                              tooltip: 'Acciones',
                              render: rowData => {
                                return (
                                  <div
                                    style={{
                                      fontSize: 11,
                                      color: '12337a',
                                      textAlign: 'left',
                                      paddingLeft:'20px'
                                    }}
                                  ><br></br>
                                  <div className='row'>
                                    <div className='col-lg-2 izqq'>Ficha técnica:</div>
                                    <div className='col-lg-3 izqq'>
                                    <NavLink style={{"transform":"scale(0.8)", "padding":"5px", "width":"70px"}} className="btn btn-primary" to={"/ficha/"+rowData["idaportantes"]}><i className="icon ion-eye"></i>  Ver</NavLink>
                                    </div>
                                    </div>
                                    <div className='row'>
                                    <div className='col-lg-2 izqq'>Enlaces y factores salariales:</div>
                                    <div className='col-lg-3 izqq'>
                                    <NavLink style={{"transform":"scale(0.8)", "padding":"5px", "width":"70px"}} className="btn btn-primary" to={"/enlaces/"+rowData["idaportantes"]}><i className="icon ion-link"></i> Ver</NavLink>
                                    </div>
                                    </div>
                                    <div className='row'>
                                    <div className='col-lg-2 izqq'>Anexos:</div>
                                    <div className='col-lg-3 izqq'>
                                    <NavLink style={{"transform":"scale(0.8)", "padding":"5px", "width":"70px"}} className="btn btn-primary" to={"/anexos/"+rowData["idaportantes"]}><i className="icon ion-document"></i> Ver</NavLink>
                                    </div>
                                    </div><br></br>
                                  </div>
                                )
                              },
                            },
                          ]}
                    
                        ></MaterialTable> ) : (
                        <MaterialTable columns={columnas} data={this.state.tabe} 
                        title="Entidades aportantes" style={{"padding": "1px 1px 1px 1px", "fontSize": "12px"}}
                          actions={[
                          ]}
                          options={{ actionsColumnIndex: -1, rowStyle: { fontSize: 13,}}}
                          localization={{ header:{ actions: 'Acciones'}}}
                          icons={definiciones}
                          detailPanel={[
                            {
                              tooltip: 'Acciones',
                              render: rowData => {
                                return (
                                  <div
                                    style={{
                                      fontSize: 11,
                                      color: '12337a',
                                      textAlign: 'left',
                                      paddingLeft:'5px'
                                    }}
                                  ><br></br>
                                  <div className='row'>
                                    <div className='col-lg-2 izqq'>Ficha técnica:</div>
                                    <div className='col-lg-3 izqq'>
                                    <NavLink style={{"transform":"scale(0.8)", "padding":"5px", "width":"70px"}} className="btn btn-primary" to={"/ficha/"+rowData["idaportantes"]}><i className="icon ion-eye"></i>  Ver</NavLink>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-lg-2 izqq'>Enlaces y factores salariales:</div>
                                    <div className='col-lg-3 izqq'>
                                    <NavLink style={{"transform":"scale(0.8)", "padding":"5px", "width":"70px"}} className="btn btn-primary" to={"/enlaces/"+rowData["idaportantes"]}><i className="icon ion-link"></i> Ver</NavLink>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className='col-lg-2 izqq'>Anexos:</div>
                                    <div className='col-lg-3 izqq'>
                                    <NavLink style={{"transform":"scale(0.8)", "padding":"5px", "width":"70px"}} className="btn btn-primary" to={"/anexos/"+rowData["idaportantes"]}><i className="icon ion-document"></i> Ver</NavLink>
                                    </div>
                                  </div><br></br>
                                </div>
                                )
                              },
                            },
                          ]}
                        ></MaterialTable>                    ) 
                      }
                      </div>
                  </div>
                </div>  
              <Footer></Footer>
            </div>
        );
    }
}
export default aportanes;