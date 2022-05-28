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
const cookies = new Cookies(); 
class clasificaAportantes extends Component {
    state = { rols:[], status: null, dato:"" };
    componentDidMount() {  }
    dato = (rols) => { 
        this.setState({ rols }); 
        axios.get(global.url + "clasificacionesaportantes", global.autentica)
        .then(res => {
            let rols = res.data;
            rols =  rols.map( (p) => { p['idc'] = p.idclasificaaportantes; return p; });
            this.setState({ rols });
        });
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/Clasificacion-aportantes"/>;}
        const columnas = [
            { title: 'ID', field:'idc', sortable: true },
            { title: 'Código', field: 'cla_codigo', sortable: true },
            { title: 'Nombre', field: 'cla_nombre', sortable: true }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Clasificación de aportantes por obligatoriedad"/>
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                        <Script3 tabla="clasificacionesaportantes" devuelvedatos={this.dato} />
                        <EncTabla titulo="Clasificación de aportantes por obligatoriedad" link="/crearcapo" titulo2="Clasificación Aportantes" />
                        <Tabla tabla="clasificacionesaportantes" columnas={columnas} valores={this.state.rols} 
                        redire="/Clasificacion-aportantes" titulo="Clasificación de aportantes por obligatoriedad" link="editacapo/" />
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default clasificaAportantes;