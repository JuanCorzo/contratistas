import React, { Component } from 'react';
import Header from '../../layout/Header';
import Menulat from '../../layout/Menulat';
import Footer from '../../layout/Footer';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import global from '../../Global';
import Chart from "react-google-charts";

const cookies = new Cookies(); 

class Inicio extends Component {
    state = { tabe:[], status: null, tabe1: [], tabe2: [], tabe3: [], tabe4: [] };
    componentDidMount(){
        var ruta="reportes";
        console.log(global.url+ruta);
        axios.get(global.url + ruta, global.autentica ).then((res) => {
          var tabe = res.data;
          this.setState({ tabe });
        }); 

        ruta="reportes/terrsinfiltro";
        axios.get(global.url + ruta, global.autentica ).then((res) => {
          var tabe = res.data;
          let tabe1 = [['Clasificacion', 'Principal',{ role: 'style' }, 'Adscrita', { role: 'style' }]]
          for (var i=0; i<tabe.length; i++) {
                var valor=tabe[i].principal*1;
                var valor1=tabe[i].adscrita*1;
                tabe1.push([tabe[i].ter_nombre, valor, 'color: #ef9d9d', valor1, 'color: #6cabee']);
          }
          this.setState({ tabe1 });
        }); 
        ruta="reportes/filtro3/0/0/0/0/0/0/0/4/0";
        axios.get(global.url + ruta, global.autentica ).then((res) => {
            var tabe = res.data;
            let tabe2 = [['Territorial', 'Cantidad',{ role: 'style' }]]
            for (var i=0; i<tabe.length; i++) {
                var valor=tabe[i].cuenta*1;
                tabe2.push([tabe[i].nombre, valor, 'color: #6cabee']);
            }
            this.setState({ tabe2 });
        }); 
        ruta="reportes/filtro3/0/0/0/0/0/0/0/3/0";
        axios.get(global.url + ruta, global.autentica ).then((res) => {
            var tabe = res.data;
            let tabe3 = [['Territorial', 'Cantidad',{ role: 'style' }]]
            for (var i=0; i<tabe.length; i++) {
                var valor=tabe[i].cuenta*1;
                tabe3.push([tabe[i].nombre, valor, 'color: #6cabee']);
            }
            this.setState({ tabe3 });
        }); 
        ruta="reportes/filtro3/0/0/0/0/0/0/0/6/0";
        axios.get(global.url + ruta, global.autentica ).then((res) => {
            var tabe = res.data;
            let tabe4 = [['Territorial', 'Cantidad']]
            for (var i=0; i<tabe.length; i++) {
                var valor=tabe[i].cuenta*1;
                tabe4.push([tabe[i].nombre, valor]);
            }
            this.setState({ tabe4 });
        }); 
    }
    render() {
        if(!cookies.get("idroles")){ return <Redirect to="./"/>;}
        return (
            <div>
                <Header />
                <Menulat />
                <div className="am-mainpanel" style={{marginTop: "5em", width:"80%", marginLeft:"auto"}}>
                    <div className="am-pagebody" >
                        <div className="card pd-20 pd-sm-20">
                        <div className="row fgris">
                            <div className="col-sm-6 col-lg-3 fblanco">
                                    <div className="widget-content widget-content-mini text-right clearfix">
                                        <div className="widget-icon pull-left themed-background-warning">
                                            <i className="gi gi-briefcase text-light-op"></i>
                                        </div><br></br>
                                        <div className='numerosaxul'>
                                        {
                                            this.state.tabe.map((cons, i) => {
                                            return (
                                                <strong key={i} ><span data-toggle="counter" data-to={cons.macros}>{cons.macros}</span></strong>
                                            )
                                            })
                                        }
                                        <span className="text-muted textprep"> Macrozonas</span>
                                        </div>
                                        <div className='numerosaxul'>
                                        {
                                            this.state.tabe.map((cons, i) => {
                                            return (
                                                <strong key={i}><span data-toggle="counter" data-to={cons.obligatorios}>{cons.obligatorios}</span></strong>
                                            )
                                            })
                                        }
                                        <span className="text-muted textprep"> Aportantes</span>
                                        </div>
                                    </div>
                            </div>
                            <div className="col-sm-6 col-lg-3 fblanco">
                                    <div className="widget-content widget-content-mini text-right clearfix">
                                        <div className="widget-icon pull-left themed-background-danger">
                                            <i className="gi gi-wallet text-light-op"></i>
                                        </div><br></br>
                                        {
                                            this.state.tabe.map((cons, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                <div className='numerosaxul'>
                                                <strong><span data-toggle="counter" data-to="1">1 </span></strong> 
                                                <span className="text-muted textprep"> Sede central</span>
                                                </div>
                                                <div className='numerosaxul'>
                                                <strong><span data-toggle="counter" data-to={cons.sedes1}>{cons.sedes1} </span> </strong>
                                                <span className="text-muted textprep"> Territoriales</span>
                                                </div>
                                                </React.Fragment>
                                            )
                                            })
                                        }
                                    </div>
                            </div>
                            
                            <div className="col-sm-6 col-lg-3 fblanco">
                                    <div className="widget-content widget-content-mini text-right clearfix">
                                        <div className="widget-icon pull-left themed-background-success">
                                            <i className="gi gi-user text-light-op"></i>
                                        </div><br></br>
                                        {
                                            this.state.tabe.map((cons, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                <div className='numerosaxul'>
                                                <strong><span data-toggle="counter" data-to={cons.principales}>{cons.principales} </span> </strong> 
                                                <span className="text-muted textprep"> Entidades con NIT principal</span>
                                                </div>
                                                
                                                <div className='numerosaxul'>
                                                <strong><span data-toggle="counter" data-to={cons.adscritos}>{cons.adscritos} </span> </strong>
                                                <span className="text-muted textprep"> Unidades ejecutoras del gasto</span>
                                                </div>

                                                </React.Fragment>
                                            )
                                            })
                                        }
                                    </div>
                            </div>
                            <div className="col-sm-6 col-lg-3 fblanco">
                                    <div className="widget-content widget-content-mini text-right clearfix">
                                        <div className="widget-icon pull-left themed-background-success">
                                            <i className="gi gi-user text-light-op"></i>
                                        </div><br></br>
                                        {
                                            this.state.tabe.map((cons, i) => {
                                            return (
                                                <React.Fragment key={i}>
                                                <div className='numerosaxul'>
                                                <strong><span data-toggle="counter" data-to={cons.principales}>{cons.oblig2} </span> </strong> 
                                                <span className="text-muted textprep"> Entidades Obligadas</span>
                                                </div>
                                                
                                                <div className='numerosaxul'>
                                                <strong><span data-toggle="counter" data-to={cons.adscritos}>{cons.estudio} </span> </strong>
                                                <span className="text-muted textprep"> Entidades en estudio de obligatoriedad</span>
                                                </div>

                                                </React.Fragment>
                                            )
                                            })
                                        }
                                    </div>
                            </div>
                        </div>
                        <div className='row fgris'>
                            <div className='col-lg-12 fblimag'>
                            <Chart
                            width={"100%"} height={380} chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.tabe1}
                            options={{title: 'Aportantes por territorial', chartArea: { width: '95%' },
                            legend: { position: 'none' }}}
                        legendToggle />
                            </div>
                        </div>
                        <div className='row fgris'>
                            <div className='col fblimag' style={{marginRight:"5px"}}>
                                <Chart
                                width={"100%"} height={380} chartType="ColumnChart"
                                loader={<div>Loading Chart</div>}
                                data={this.state.tabe3}
                                options={{title: 'Aportantes por orden', chartArea: { width: '95%' },
                                legend: { position: 'none' }}}
                            legendToggle />
                            </div>
                            <div className='col fblimag' style={{marginLeft:"5px"}}>
                                <Chart width={'100%'} height={380} chartType="PieChart"
                                loader={<div>Loading Chart</div>} 
                                data={this.state.tabe4} options={{ title: 'Aportantes por macrozona', is3D:true,
                                colors: ['#6cabee', '#65ada2', '#ec8f6e', '#f3b49f', '#f6c7b6'],
                                }}
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
export default Inicio;