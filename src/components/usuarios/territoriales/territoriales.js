import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import { Redirect } from 'react-router-dom';
import Script3 from '../../../scripts/scripts3';
import EncTabla from '../../../comunes/EncTabla';
import Tabla from '../../../comunes/Tabla';
import Tabla3 from '../../../comunes/Tabla3';
import axios from 'axios';
import global from '../../../Global';


const cookies = new Cookies();
class Territoriales extends Component {
    Departamento = React.createRef();
    state = { tabl: [], status: null, deps: [] };
    dato = (tabl) => {
        this.setState({ tabl });
        axios.get(global.url + "aportantes/territoriales/terri", global.autentica)
            .then(res => {
                let rols = res.data;
                rols = rols.map((p) => { p['idc'] = p.idterritorial; return p; });
                this.setState({ rols });
            });
    }
    componentDidMount() { }
    render() {
        if (!cookies.get("idroles")) { return <Redirect to="./" />; }
        const columnas = [
            { title: 'Código', field: 'ter_cod', sortable: true },
            { title: 'Territorial', field: 'ter_nombre', sortable: true },
            { title: 'Macrozona', field: 'ter_macrozona', sortable: true },
        ]

        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className='pt-5 m-auto'>
                    <div className="am-mainpanel">

                        <div className="card pd-20 pd-sm-40">
                            <Script3 tabla="aportantes/territoriales/terri" devuelvedatos={this.dato} />
                            <div className='lineacolor-card'>
                                {cookies.get("idroles") === "1" ? (
                                    <React.Fragment>
                                        <div className='xill20'>
                                            <EncTabla titulo="Territoriales" link="/Crearterr" titulo2="Territoriales" />
                                        </div>
                                        <Tabla tabla="territoriales" columnas={columnas} valores={this.state.rols}
                                            redire="/territoriales" titulo="Territoriales" link="editaterr/" />
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <h6 className="card-body-title">Territoriales</h6>
                                        <Tabla3 tabla="territoriales" columnas={columnas} valores={this.state.rols}
                                            redire="/territoriales" titulo="Territoriales" link="editaterr/" />
                                    </React.Fragment>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Territoriales;