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
import Breadcrumb from '../../../layout/Breadcrumb';

//import Departamento from '../../../helpers/departamentos';

const cookies = new Cookies();
class Municipios extends Component {
    Departamento = React.createRef();
    state = { tabl: [], status: null, deps: [] };
	linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../municipios", name:"Municipios"}];
    dato = (tabl) => {
        this.setState({ tabl });
        axios.get(global.url + "ciudades", global.autentica)
            .then(res => {
                let tabl = res.data;
                tabl = tabl.map((p) => { p['idc'] = p.idciudades; return p; });
                this.setState({ tabl });
            });
    }
    componentDidMount() { }
    render() {
        if (cookies.get("idroles") !== "1" && cookies.get("idroles") !== "26") { return <Redirect to="./" />; }
        const columnas = [
            { title: 'Código', field: 'ciu_codigo', sortable: true },
            { title: 'Departamento', field: 'dep_nombre', sortable: true },
            { title: 'Municipio', field: 'ciu_nombre', sortable: true },
        ]
        return (
            <div className='pt-5 m-auto'>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Municipios" />
                <div>
                    <div className="am-mainpanel">
						<div className='leftBreadcrumb'>
							<Breadcrumb links={this.linksBreadcrumb}></Breadcrumb>
						</div>
                        <div className="card pd-20 pd-sm-40">
                            <div className='lineacolor-card'>
                                <Script3 tabla="ciudades" devuelvedatos={this.dato} />
                                <div className='xill20'>
								<EncTabla titulo="Municipios" link="/Crearmuni" titulo2="Municipios" />
                                </div>
                                <Tabla tabla="ciudades" columnas={columnas} valores={this.state.tabl}
                                    redire="/Municipios" titulo="Municipios" link="editamuni/" />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Municipios;