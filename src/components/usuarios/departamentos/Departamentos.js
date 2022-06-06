import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import { Redirect } from 'react-router-dom';
import Titulo from '../../../comunes/Titulo';
import Script3 from '../../../scripts/scripts3';
import EncTabla from '../../../comunes/EncTabla';
import Tabla from '../../../comunes/Tabla';
//import Territorial from '../../../helpers/territoriales';
import axios from 'axios';
import global from '../../../Global';
import Breadcrumb from '../../../layout/Breadcrumb';

const cookies = new Cookies(); 
class Departamento extends Component {
    Departamento = React.createRef(); 
    state = { tabl: [], status: null, deps:[]};
    dato = (tabl) => { 
        this.setState({ tabl }); 
        axios.get(global.url + "departamentos", global.autentica)
        .then(res => {
            let tabl = res.data;
            tabl =  tabl.map( (p) => { p['idc'] = p.iddepartamentos; return p; });
            this.setState({ tabl });
        });
    }
    componentDidMount() {}
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26") { return <Redirect to="./"/>; }
        const columnas = [
            { title: 'Territorial', field: 'ter_nombre', sortable: true },
            { title: 'Código', field:'dep_codigo', sortable: true},
            { title: 'Departamento', field: 'dep_nombre', sortable: true }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className='pt-5 m-auto'>
                    <div className="am-mainpanel">
                        <div className="card pd-20 pd-sm-40">
                            <Script3 tabla="departamentos" devuelvedatos={this.dato} />
                            <EncTabla titulo="Departamentos" link="/Creardpto" titulo2="Departamentos" />
                            <Tabla tabla="departamentos" columnas={columnas} valores={this.state.tabl} 
                            redire="/Departamentos" titulo="Departamentos" link="editadpto/" />
                        </div>
                    </div>
                </div>

                <Footer></Footer>
            </div>
        );
    }
}
export default Departamento;