import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import { Redirect, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MaterialTable from 'material-table';
import definiciones from '../../../comunes/definiciones';
import PatchedPagination from '../../../comunes/PatchedPagination';
import FiltrosConsulta from '../comunes/filtrosConsultas';
import EncTabla from '../../../comunes/EncTabla';
import { Paper } from '@material-ui/core';

const cookies = new Cookies(); 

class aportanes extends Component {
    state = { tabe:[], tabe1:[], status: null };
    componentDidMount() {}
    dato = (tabe) => { this.setState({ tabe });  }
    dato1 = (tabe1) => { this.setState({ tabe1 });  }
    render() {
        if(!cookies.get("idroles")) { return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/aportantes"/>; }
        const columnas = [
          { title: 'NIT', headerStyle: { "textAlign": "center","padding":"0px"}, field:'apo_identificacion', sortable: true, width: "15%",
            render: row =>  (
              row["apo_sufijo"]===""?( <React.Fragment>{ row["apo_identificacion"]}</React.Fragment>) :
              row["apo_sufijo"]==="0"?( <React.Fragment>{ row["apo_identificacion"]}</React.Fragment>) :
              ( <React.Fragment><table><tr><td>{row["apo_identificacion"]}-</td><td>{row["apo_sufijo"]}</td></tr></table></React.Fragment>)
            )
          },
          { title: 'Entidad', headerStyle: { "textAlign": "center", "padding":"0px"}, field:'apo_nombre', sortable: true, width: "15%" },
          { title: 'Municipio', headerStyle: { "textAlign": "center","padding":"0px"}, field:'ciu_nombre', sortable: true, width: "10%" },
          { title: 'Departamento', headerStyle: { "textAlign": "center","padding":"0px"}, field:'dep_nombre', sortable: true, width: "10%" },
          { title: 'Territorial', headerStyle: { "textAlign": "center","padding":"0px"}, field:'ter_nombre', sortable: true, width: "10%" },
          { title: 'Macrozona', headerStyle: { "textAlign": "center","padding":"0px"}, field:'ter_macrozona', sortable: true, width: "20%" },
          { title: 'Teléfono', headerStyle: { "textAlign": "center","padding":"0px"}, field:'apo_celular', sortable: true, width: "10%"},
          { title: 'Detalles', headerStyle: { "textAlign": "center","padding":"0px"}, field:'apo_ordenentidad', sortable: false, width: "10%",
            render: row =>  (
              <center><NavLink className="btn btn-primary" style={{"transform":"scale(0.8)", "padding":"5px", "width":"70px"}}
               to={"/ficha/"+row["idaportantes"]}><i className="icon ion-eye"></i> Ver</NavLink></center>
          )}
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                  <div className='pt-5 m-auto'>
                    <div className="am-mainpanel">
                      
                      <div className="card pd-20 pd-sm-40 pt-3">
                          <div className='col-lg-12 fflitro lineacolor-card'>
                            <div className='xill20'>
                              <EncTabla titulo="Consulta Aportantes" showButton="false" />
                            </div>
                            <FiltrosConsulta devuelvedatos={this.dato} devuelvedatos2={this.dato1} titulo='uno'/>
                          </div> 

                          <br></br>
                          <br></br>

                          <div className='lineacolor-card'>
                              <div className="">
							  	<div className='xill20'>
							  		<EncTabla titulo="Consulta Entidades aportantes" showButton="false" />
								</div>
                                <MaterialTable 
                                  components={{
                                    Pagination: PatchedPagination,
									Container: props => <Paper {...props} elevation={0}/>
                                  }}
                                  columns={columnas} data={this.state.tabe} title=""
                                  options={{ actionsColumnIndex: -1, rowStyle: { fontSize: 13 }}}
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
export default aportanes;