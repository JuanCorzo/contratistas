import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Script3 from '../../../scripts/scripts3';
import EncTabla from '../../../comunes/EncTabla';
import Tabla from '../../../comunes/Tabla';
import axios from 'axios';
import global from '../../../Global';
import Breadcrumb from '../../../layout/Breadcrumb';

const cookies = new Cookies(); 
class tiposEntidades extends Component {
    state = { rols:[], status: null, dato:"" };
	linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../tipoadscrita", name:"Orden entidades"}];
    componentDidMount() {  }
    dato = (rols) => { 
        this.setState({ rols }); 
        axios.get(global.url + "tipoadscrita", global.autentica)
        .then(res => {
            let rols = res.data;
            rols =  rols.map( (p) => { p['idc'] = p.idtipoadscrita; return p; });
            this.setState({ rols });
        });
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/tipoadscrita"/>;}
        const columnas = [
            { title: 'ID', field:'idc', sortable: true },
            { title: 'Código', field: 'tad_codigo', sortable: true },
            { title: 'Orden', field: 'tad_descripcion', sortable: true }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className='pt-5 m-auto'>
                    <div className="am-mainpanel">
						<div className='leftBreadcrumb'>
							<Breadcrumb links={this.linksBreadcrumb}></Breadcrumb>
						</div>
                        
                        <div className="card pd-20 pd-sm-40">
                        <div className='lineacolor-card'>
                            <Script3 tabla="tipoadscrita" devuelvedatos={this.dato} />
                            <div className='xill20'>
                                <EncTabla titulo="Orden Entidades" link="/creartent" titulo2="Orden Entidades" />
                            </div>
                            <Tabla tabla="tipoadscrita" columnas={columnas} valores={this.state.rols} 
                            redire="/tipoadscrita" titulo="Orden Entidades" link="editatent/" />
                        </div>
                        </div>
                    </div>
                </div>   
                <Footer></Footer>
            </div>      
        );
    }
}
export default tiposEntidades;