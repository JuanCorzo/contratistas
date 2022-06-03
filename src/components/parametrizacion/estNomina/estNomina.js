import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Script3 from '../../../scripts/scripts3';
import EncTabla from '../../../comunes/EncTabla';
import Tabla from '../../../comunes/Tabla';
import axios from 'axios';
import global from '../../../Global';
import Breadcrumb from '../../../layout/Breadcrumb';
const cookies = new Cookies(); 
class estNomina extends Component {
    state = { rols:[], status: null, dato:"" };
    componentDidMount() {  }
    dato = (rols) => { 
        this.setState({ rols }); 
        axios.get(global.url + "estructuranomnina", global.autentica)
        .then(res => {
            let rols = res.data;
            rols =  rols.map( (p) => { p['idc'] = p.idestructuranomina; return p; });
            this.setState({ rols });
        });
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/EstructuraNomina"/>;}
        const columnas = [
            { title: 'ID', field:'idc', sortable: true },
            { title: 'Código', field: 'est_codigo', sortable: true },
            { title: 'Nombre', field: 'est_nombre', sortable: true },
            { title: 'Descripción', field: 'est_descripcion', sortable: true },
        ]
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"EstructuraNomina", name:"Factores salariales"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
<<<<<<< HEAD
                    <div className='m-auto pt-5' >
=======
>>>>>>> 994a213ba350bf910fb706ff1ecb24b1c3b3931c
                        <Titulo titulo="Factores salariales"/>
                        <div className="am-mainpanel">
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>
                            <div className="card pd-20 pd-sm-40">
                                <Script3 tabla="estructuranomnina" devuelvedatos={this.dato} />
                                <EncTabla titulo="Factores salariales" link="/crearestn" titulo2="Factores salariales" />
                                <Tabla tabla="estructuranomnina" columnas={columnas} valores={this.state.rols} 
                                redire="/EstructuraNomina" titulo="Factores salariales" link="editaestn/" />
                            </div>
                        </div>    
                <Footer></Footer>
            </div>
        );
    }
}
export default estNomina;