import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';
import Map from "../../login/Map";
import FiltrosConsulta from '../comunes/filtrosConsultas';
const cookies = new Cookies(); 

class Mapas extends Component {
    state = { tabe:[], status: null, tabe1: [], tabe2: [] };
    componentDidMount(){}
    dato = (tabe) => { this.setState({ tabe });  }
    dato1 = (tabe1) => { this.setState({ tabe1 });  }
    render() {
        if(!cookies.get("idroles"))
        {
            return <Redirect to="./"/>;
        }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-pagetitle">
                    <h5 className="am-title">Localización de aportantes</h5>
                </div>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                        <FiltrosConsulta devuelvedatos={this.dato} devuelvedatos2={this.dato1} titulo='tres'/>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    
                                    <Map  
                                        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyD_Qp4T_cMBfiwYxMyMTcgbOSQPupixMUE'}
                                        containerElement={ <div style={{height:"550px"}}/> }
                                        mapElement= {<div style={{height:"100%"}}/> }
                                        loadingElement= { <p>Cargando</p> } >
                                    </Map>
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