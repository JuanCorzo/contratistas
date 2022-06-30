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
import Moment from "react-moment";
import Descargado from '../../../comunes/descargardocs';
import EncTabla from '../../../comunes/EncTabla';
import { Paper } from '@material-ui/core';

const cookies = new Cookies();

class lineasdetiempo extends Component {
    state = { tabe: [], status: null, tabe1: [], dataLinea: [] };
    componentDidMount() { }
    dato = (tabe) => { this.setState({ tabe }); }
    dato1 = (tabe1) => {
        let data = tabe1;
        if (data.length === 1) data.push(["SIN DATOS", "", new Date(), new Date()]);

        /*const columns = [
            { type: 'string', id: 'Position' },
            { type: 'string', id: 'Name' },
            { type: 'date', id: 'Start' },
            { type: 'date', id: 'End' },
        ];
        const rows = [
            ["FTF", "ABC", new Date("2020", "0", "13") , new Date("2020", "0", "29")],
            ["FTV", "ABC", new Date("2020", "0", "13") , new Date("2020", "0", "24")],
            ["FTC", "ABC", new Date("2020", "0", "13") , new Date("2020", "0", "28")],
        ];
        data = [columns].concat([["SIN DATOS","",new Date(),new Date()]]);*/

        this.setState({ dataLinea: data });
    }
    render() {
        if (!cookies.get("idroles")) { return <Redirect to="./" />; }
        if (this.state.status === "Ok") { return <Redirect to="/aportantes" />; }
        var columnas = [
            {
                title: 'Fecha', field: 'fecha', sortable: true, type: 'date',
                render: row => <Moment format="DD MMM YYYY">{row["apo_fecha"]}</Moment>
            },
            { title: 'Entidad', field: 'aportante', sortable: true },
            { title: 'NIT', field: 'apo_identificacion', sortable: true },
            { title: 'Sufijo', field: 'apo_sufijo', sortable: true },
            { title: 'Documento', field: 'tipo', sortable: true },
            {
                title: 'Anexos', field: 'id', sortable: false, width: "10%",
                render: row => (<Descargado docid={row["id"]} />)
            }
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
                                    <EncTabla titulo="Linea de Tiempo" showButton="false" />
                                    <FiltrosConsulta devuelvedatos={this.dato} devuelvedatos2={this.dato1} titulo='tres' />
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <div className='row'>
                                <div className="col-lg-12">
                                    <Chart
                                        width={'100%'} height={'350px'}
                                        chartType="Timeline" loader={<div>Loading Chart</div>}
                                        data={this.state.dataLinea}
                                        options={{ showRowNumber: true }}
                                        rootProps={{ 'data-testid': '1' }} />
                                </div>
                            </div>
                            <div className='lineacolor-card'>
                                <div className="">
                                    <MaterialTable
                                        components={{
                                            Pagination: PatchedPagination,
											Container: props => <Paper {...props} elevation={0}/>
                                        }}
                                        columns={columnas} data={this.state.tabe} title="Líneas de tiempo de documentos y enlaces"
                                        options={{ actionsColumnIndex: -1, rowStyle: { fontSize: 13 } }}
                                        localization={{ header: { actions: 'Acciones' } }}
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
export default lineasdetiempo;