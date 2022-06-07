import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import global from '../../../Global';
import imgbas from '../../../assets/images/zonas/base.png';
import macro1 from '../../../assets/images/zonas/macrozona1.png';
import macro2 from '../../../assets/images/zonas/macrozona2.png';
import macro3 from '../../../assets/images/zonas/macrozona3.png';

import terant from '../../../assets/images/zonas/esap-ant.png';
import terara from '../../../assets/images/zonas/esap-ara.png';
import teratl from '../../../assets/images/zonas/esap-atl.png';
import terbog from '../../../assets/images/zonas/esap-bog.png';
import terboy from '../../../assets/images/zonas/esap-boy.png';

import tercal from '../../../assets/images/zonas/esap-cal.png';
import tercau from '../../../assets/images/zonas/esap-cau.png';
import tercho from '../../../assets/images/zonas/esap-cho.png';
import tercun from '../../../assets/images/zonas/esap-cun.png';
import terhui from '../../../assets/images/zonas/esap-hui.png';

import termet from '../../../assets/images/zonas/esap-met.png';
import ternar from '../../../assets/images/zonas/esap-nar.png';
import terqui from '../../../assets/images/zonas/esap-qui.png';
import tersan from '../../../assets/images/zonas/esap-san.png';
import tersuc from '../../../assets/images/zonas/esap-suc.png';

import tertol from '../../../assets/images/zonas/esap-tol.png';
import terval from '../../../assets/images/zonas/esap-val.png';

const cookies = new Cookies();

class Mapas extends Component {
    state = { terr: [], macr: [], status: null, most:[], muestra:"" };
    componentDidMount() {
        axios.get(global.url + "aportantes/territoriales/macro", global.autentica)
            .then(res => {
                let macr = res.data;
                this.setState({ macr });
            });
        axios.get(global.url + "aportantes/territoriales/terri", global.autentica)
            .then(res => {
                let terr = res.data;
                this.setState({ terr });
            });
    }
    cambio = event => {
        var valor = event.target.value;
        var valor1 = valor.substr(3,2);
        var macr= 0;
        if(valor==="mac1"){ macr=4;  }
        else if(valor==="mac2"){ macr=5;  }
        else { macr=6;  }
        var estado = event.target.checked;
        if (estado) {
            var ruta = "reportes/zonarepo2/"+valor1;
            if(valor.substr(0,3)==="mac"){
                ruta = "reportes/zonarepo/"+macr;
            }
            axios.get(global.url + ruta, global.autentica)
            .then(res => {
                let most = res.data;
                let muestra = "<b>" + most[0].nombre + "</b><br>Aportantes: " + most[0].aportantes + "<br>Territoriales: " + most[0].territoriales + "<br>Sedes: " + most[0].sedes;
                document.getElementById("mensa").innerHTML = muestra;
                //this.setState({muestra:muestra })
                //this.setState({ most });
            });
            document.getElementById(valor).style.visibility = "visible";
        }
        else {
            document.getElementById(valor).style.visibility = "hidden";
        }
    }
    render() {
        if (!cookies.get("idroles")) {
            return <Redirect to="./" />;
        }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                    <div className='m-auto' style={{paddingLeft: "3em",paddingRight: "3em", paddingTop: "3em"}}>
                        <div className="am-mainpanel">
                            <div className="am-pagebody">
                                <div className="card pd-20 pd-sm-40">
                                    <div className='row'>
                                        <div className="col-lg-3">
                                            <div className='row'>
                                                <div className="col-lg-12 izqq">
                                                    <h6>Macrozonas</h6>
                                                    {
                                                        this.state.macr.map((con, i) => {
                                                            var p = i + 1;
                                                            var valor = "mac" + p;
                                                            return (
                                                                <React.Fragment>
                                                                    <label className='letrape'><input type='checkbox' onChange={this.cambio} name="macro" key={i}
                                                                        value={valor} /> {con.ter_macrozona}</label><br></br>
                                                                </React.Fragment>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col-lg-12 izqq"><br></br>
                                                    <h6>Territoriales</h6>
                                                    {
                                                        this.state.terr.map((con, i) => {
                                                            return (
                                                                <React.Fragment>
                                                                    <label className='letrape'><input type='checkbox' onChange={this.cambio} key={i} 
                                                                    value={"zon" + con.idterritorial} /> {con.ter_nombre}</label><br></br>
                                                                </React.Fragment>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-7">
                                            <img src={imgbas} alt='' className='imagenesmap' />
                                            <div id="mac1" className='imagenesmap1'><img src={macro1} alt='' className='imagenesmap' /></div>
                                            <div id="mac2" className='imagenesmap1'><img src={macro2} alt='' className='imagenesmap' /></div>
                                            <div id="mac3" className='imagenesmap1'><img src={macro3} alt='' className='imagenesmap' /></div>

                                            <div id="zon2" className='imagenesmap1'><img src={terant} alt='' className='imagenesmap' /></div>
                                            <div id="zon3" className='imagenesmap1'><img src={tercho} alt='' className='imagenesmap' /></div>
                                            <div id="zon1" className='imagenesmap1'><img src={terboy} alt='' className='imagenesmap' /></div>
                                            <div id="zon17" className='imagenesmap1'><img src={terval} alt='' className='imagenesmap' /></div>
                                            <div id="zon4" className='imagenesmap1'><img src={teratl} alt='' className='imagenesmap' /></div>
                                            <div id="zon5" className='imagenesmap1'><img src={tersuc} alt='' className='imagenesmap' /></div>
                                            <div id="zon6" className='imagenesmap1'><img src={tercal} alt='' className='imagenesmap' /></div>
                                            <div id="zon7" className='imagenesmap1'><img src={tercau} alt='' className='imagenesmap' /></div>
                                            <div id="zon8" className='imagenesmap1'><img src={tercun} alt='' className='imagenesmap' /></div>
                                            <div id="zon9" className='imagenesmap1'><img src={terhui} alt='' className='imagenesmap' /></div>
                                            <div id="zon10" className='imagenesmap1'><img src={termet} alt='' className='imagenesmap' /></div>
                                            <div id="zon11" className='imagenesmap1'><img src={ternar} alt='' className='imagenesmap' /></div>
                                            <div id="zon12" className='imagenesmap1'><img src={terara} alt='' className='imagenesmap' /></div>
                                            
                                            <div id="zon16" className='imagenesmap1'><img src={tertol} alt='' className='imagenesmap' /></div>
                                            <div id="zon13" className='imagenesmap1'><img src={terqui} alt='' className='imagenesmap' /></div>
                                            <div id="zon14" className='imagenesmap1'><img src={tersan} alt='' className='imagenesmap' /></div>
                                            <div id="zon15" className='imagenesmap1'><img src={terbog} alt='' className='imagenesmap' /></div>
                                        </div>
                                        <div className='col-log-2'>
                                            <div id="mensa" style={{fontSize:"14px", textAlign:"left"}}></div>
                                        </div>
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
export default Mapas;