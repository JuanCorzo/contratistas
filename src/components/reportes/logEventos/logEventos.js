import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Script3 from '../../../scripts/scripts3';
import Tabla3 from '../../../comunes/Tabla3';
import EncTabla from '../../../comunes/EncTabla';
const cookies = new Cookies(); 
class Roles extends Component {
    state = { rols:[], status: null, dato:"" };
    componentDidMount() {  }
    dato = (rols) => { this.setState({ rols }); }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/logs"/>;}
        const columnas = [
            { title: 'ID', field:'idc', sortable: true },
            { title: 'Fecha', field: 'log_fecha', sortable: true },
            { title: 'Acción', field: 'log_accion', sortable: true },
            { title: 'Elemento', field: 'log_objeto', sortable: true },
            { title: 'Usuario', field: 'usu_nombre', sortable: true }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                    <div className='pt-5 m-auto'>
                        <div className="am-mainpanel">
                            <div className="card pd-20 pd-sm-40">
                            <div className='lineacolor-card'> 
                            <div className='xill20'>
                                <Script3 tabla="logs" devuelvedatos={this.dato} />
                                <EncTabla titulo="Logs de Eventos" showButton="false" />
                            </div>
                                <Tabla3 tabla="logs" columnas={columnas} valores={this.state.rols} titulo="" link="/" />
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