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

const cookies = new Cookies();
class Roles extends Component {
    state = { rols: [], status: null, dato: "" };
    componentDidMount() { }
    dato = (rols) => {
        this.setState({ rols });
        axios.get(global.url + "clasificas", global.autentica)
            .then(res => {
                let rols = res.data;
                rols = rols.map((p) => { p['idc'] = p.idclasificadocumentos; return p; });
                this.setState({ rols });
            });
    }
    render() {
        if (cookies.get("idroles") !== "1" && cookies.get("idroles") !== "26") { return <Redirect to="./" />; }
        if (this.state.status === "Ok") { return <Redirect to="/clasificas" />; }
        const columnas = [
            { title: 'ID', field: 'idc', sortable: true },
            { title: 'Clasificación documento', field: 'cld_nombre', sortable: true }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>

                <div className='pt-5 m-auto'>
                    <div className="am-mainpanel">

                        <div className="card pd-20 pd-sm-40">
                            <div className='lineacolor-card'>
                                <Script3 tabla="clasificas" devuelvedatos={this.dato} />
                                <div className='xill20'>
                                    <EncTabla titulo="Clasificación de documentos" link="/crearclad" titulo2="Clasificación documento" />
                                </div>
                                <Tabla tabla="clasificas" columnas={columnas} valores={this.state.rols}
                                    redire="/clasificas" titulo="Clasificación documento" link="editaclad/" />
                            </div>

                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Roles;