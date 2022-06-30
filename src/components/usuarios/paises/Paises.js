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

const cookies = new Cookies();
class Paises extends Component {
    state = { tabl: [], status: null };
	linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"../paises", name:"Paises"}];
    componentDidMount() { }
    dato = (tabl) => {
        this.setState({ tabl });
        axios.get(global.url + "paises", global.autentica)
            .then(res => {
                let tabl = res.data;
                tabl = tabl.map((p) => { p['idc'] = p.idpaises; return p; });
                this.setState({ tabl });
            });
    }
    render() {
        if (cookies.get("idroles") !== "1") { return <Redirect to="./" />; }
        const columnas = [
            { title: 'Código', field: 'pai_codigo', sortable: true },
            { title: 'Nombre', field: 'pai_nombre', sortable: true },
        ]

        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className='pt-5 m-auto'>
                    <Titulo titulo="Paises" />
                    <div className="am-mainpanel">
						<div className='leftBreadcrumb'>
							<Breadcrumb links={this.linksBreadcrumb}></Breadcrumb>
						</div>
                        <div className="card pd-20 pd-sm-40">
                            <div className='lineacolor-card'>
                                <Script3 tabla="paises" devuelvedatos={this.dato} />
                                <div className='xill20'>
                                    <EncTabla titulo="Paises" link="/Crearpais" titulo2="Paises" />
                                </div>
                                <Tabla tabla="paises" columnas={columnas} valores={this.state.tabl}
                                    redire="/Paises" titulo="Pais" link="editapais/" />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Paises;