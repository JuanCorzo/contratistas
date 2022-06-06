import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import MaterialTable from 'material-table';
import definiciones from '../../../comunes/definiciones';
import PatchedPagination from '../../../comunes/PatchedPagination';
import FiltrosConsulta from '../comunes/filtrosConsultas';
import Chart from "react-google-charts";
import NumberFormat from "react-number-format";
import EncTabla from '../../../comunes/EncTabla';
const cookies = new Cookies(); 

class consolidadosaportanes extends Component {
    state = { tabe:[], status: null, tabe1: [] };
    componentDidMount() {}
    dato = (tabe) => { this.setState({ tabe });  }
    dato1 = (tabe1) => { this.setState({ tabe1 });  }
    render() {
        if(!cookies.get("idroles")) { return <Redirect to="./"/>; }
        if(this.state.status==="Ok"){ return <Redirect to="/aportantes"/>; }
        const columnas = [
          { title: '', field:'nombre', sortable: true, width: "40%" },
          { title: 'Cantidad', field:'cuenta', sortable: true, width: "20%" },
          { title: 'Promedio IBC', field:'promedio', sortable: false, width: "20%",
            render: row =>  (
              <div><NumberFormat value={row["promedio"]} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
          )},
          { title: 'Promedio empleados', field:'empleados', sortable: false, width: "20%",
          render: row =>  (
            <div><NumberFormat value={row["empleados"]} displayType={'text'} thousandSeparator={true} prefix="" /></div>
        )},
      ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>                
                  <div className='pt-5 m-auto'>
                    <div className="am-mainpanel">
                      <div className="card pd-20 pd-sm-40 pt-3">
                        <EncTabla titulo="Consolidado Aportantes" showButton="false" />

                        <FiltrosConsulta devuelvedatos={this.dato} devuelvedatos2={this.dato1} titulo='dos'/>
                        <div className='row'>
                            <div className="col-lg-6">
                                <MaterialTable 
                                components={{
                                  Pagination: PatchedPagination,
                                }}
                                columns={columnas} data={this.state.tabe} title="Consulta Entidades aportantes"
                                options={{ actionsColumnIndex: -1, rowStyle: { fontSize: 13 }}}
                                localization={{ header:{ actions: 'Acciones'}}}
                                icons={definiciones}
                                rowsPerPageOptions={[25, 50, 100]}
                                ></MaterialTable> 
                            </div>
                            <div className="col-lg-6 ">
                                <Chart width={'100%'} height={'100%'} chartType="PieChart"
                                loader={<div>Loading Chart</div>} 
                                data={this.state.tabe1} options={{ title: '', is3D:true }}
                                rootProps={{ 'data-testid': '1' }}/>          
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
export default consolidadosaportanes;