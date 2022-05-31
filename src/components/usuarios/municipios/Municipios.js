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
import axios from 'axios';
import global from '../../../Global';

//import Departamento from '../../../helpers/departamentos';

const cookies = new Cookies(); 
class Municipios extends Component {
    Departamento = React.createRef(); 
    state = { tabl: [], status: null, deps:[]};
    dato = (tabl) => { 
        this.setState({ tabl }); 
        axios.get(global.url + "ciudades", global.autentica)
        .then(res => {
            let tabl = res.data;
            tabl =  tabl.map( (p) => { p['idc'] = p.idciudades; return p; });
            this.setState({ tabl });
        });
    }
    componentDidMount() {}
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26") { return <Redirect to="./"/>; }
        const columnas = [
            { title: 'Código', field:'ciu_codigo', sortable: true},
            { title: 'Departamento', field: 'dep_nombre', sortable: true },
            { title: 'Municipio', field: 'ciu_nombre', sortable: true },
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                    <div className='w-75 m-auto pt-5'>
                        <Titulo titulo="Municipios"/>
                        <div className="am-mainpanel">
                            <div className="card pd-20 pd-sm-40">
                                {/*<Departamento devuelvedatos={this.dato}  />*/}
                                <Script3 tabla="ciudades" devuelvedatos={this.dato} />
                                <EncTabla titulo="Municipios" link="/Crearmuni" titulo2="Municipios" />
                                <Tabla tabla="ciudades" columnas={columnas} valores={this.state.tabl} 
                                redire="/Municipios" titulo="Municipios" link="editamuni/" />
                            </div>
                        </div>
                    </div>    
                <Footer></Footer>
            </div>
        );
    }
}
export default Municipios;