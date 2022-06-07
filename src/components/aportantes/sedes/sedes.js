import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import { Redirect } from 'react-router-dom';
import Script3 from '../../../scripts/scripts3';
import EncTabla from '../../../comunes/EncTabla';
import Tabla from '../../../comunes/Tabla';
import axios from 'axios';
import global from '../../../Global';

const cookies = new Cookies(); 
class sedes extends Component {
    state = { tabl: [], status: null, deps:[]};
    dato = (tabl) => { 
        this.setState({ tabl }); 
        axios.get(global.url + "sedes", global.autentica)
        .then(res => {
            let tabl = res.data;
            tabl =  tabl.map( (p) => { p['idc'] = p.idsedes; return p; });
            this.setState({ tabl });
        });
    }
    componentDidMount() {}
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26") { return <Redirect to="./"/>; }
        const columnas = [
            { title: 'Territorial', field: 'ter_nombre', sortable: true },
            { title: 'Departamento', field: 'dep_nombre', sortable: true },
            { title: 'Municipio', field: 'ciu_nombre', sortable: true },
            { title: 'Código', field: 'sed_codigo', sortable: true },
            { title: 'Nombre', field:'sed_nombre', sortable: true},
            { title: 'Dirección', field: 'sed_direccion', sortable: true },
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                    <div className='pt-5 m-auto'>
                        <form name="forma">
                            <div className="am-mainpanel">
                                <div className="card pd-20 pd-sm-40">
                                    <Script3 tabla="sedes" devuelvedatos={this.dato} />
                                    <EncTabla titulo="Sedes" link="/Crearsede" titulo2="Sedes" />
                                    <Tabla tabla="sedes" columnas={columnas} valores={this.state.tabl} 
                                    redire="/sedes" titulo="Sedes" link="editasede/" />
                                </div>
                            </div>
                        </form>
                    </div>    
                <Footer></Footer>
            </div>
        );
    }
}
export default sedes;