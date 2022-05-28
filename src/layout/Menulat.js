import React, { Component } from 'react'
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import global from '../Global';

const cookies = new Cookies(); 
class Menulat extends Component {
    state = { perm:[], terr:[], status: null, estado:"" };

    componentDidMount() {
        var rol = cookies.get("idroles");
        axios.get(global.url + "permisos/rol/" + rol, global.autentica)
        .then(res => {
            let perm = res.data;
            this.setState({ perm });
        });
    }
    render() {
        return (
            <div className="am-sideleft colorback" style={{width:"170px"}}>
                <div className="tab-content">
                <div className="nombret">
                    { cookies.get("inicial") }
                </div>
                    <div key="mainMenu" id="mainMenu" className="tab-pane active">
                        <ProSidebar>
                            <Menu iconShape="square">
                                <MenuItem id="0" key="item_1" icon={<i className="icon ion-ios-home-outline tx-20"></i>}><NavLink to="./inicio">Inicio</NavLink></MenuItem>

                                <SubMenu key="sub_1" title="Configuración" icon={<i className="icon ion-ios-gear-outline tx-20"></i>} >
                                {
                                    this.state.perm.map((cons, i) => {
                                        return (
                                            cons.men_ordenc===1 && (
                                                <MenuItem key={`config_${i}`} id={i}><NavLink to={cons.men_ruta}>{cons.men_nombre}</NavLink></MenuItem>
                                            )
                                        )
                                    })
                                }
                                </SubMenu>
                                <SubMenu key="sub_2" title="Parametrización" icon={<i className="icon ion-ios-filing-outline tx-20"></i>} >
                                {
                                    this.state.perm.map((cons, i) => {
                                        return (
                                            cons.men_ordenc===2 ?(
                                                <MenuItem key={`parametrizacion_${i}`} id={i}><NavLink to={cons.men_ruta}>{cons.men_nombre}</NavLink></MenuItem>
                                            ):(<React.Fragment key={`parametrizacion_${i}`}></React.Fragment>)// Refactorizar
                                        )
                                    })
                                }
                                </SubMenu>
                                <SubMenu key="sub_3" title="Aportantes" icon={<i className="icon fa fa-dollar tx-20"></i>} >
                                {
                                    this.state.perm.map((cons, i) => {
                                        return (
                                            cons.men_ordenc===3 ?(
                                                <MenuItem key={`aportantes_${i}`} id={i}><NavLink to={cons.men_ruta}>{cons.men_nombre}</NavLink></MenuItem>
                                            ):(<React.Fragment key={`aportantes_${i}`}></React.Fragment>)
                                        )
                                    })
                                }
                                </SubMenu>
                                <SubMenu key="sub_4" title="Reportes" icon={<i className="icon ion-pie-graph tx-20"></i>} >
                                {
                                    this.state.perm.map((cons, i) => {
                                        return (
                                            cons.men_ordenc===4 ?(
                                                <MenuItem key={`reporte_${i}`} id={i}><NavLink to={cons.men_ruta}>{cons.men_nombre}</NavLink></MenuItem>
                                            ):(<React.Fragment key={`reporte_${i}`}></React.Fragment>)
                                        )
                                    })
                                }
                                </SubMenu>
                                <MenuItem key="item_2" icon={<i className="icon ion-close tx-20"></i>}>
                                    <NavLink to='/'>Salir</NavLink>
                                </MenuItem>
                            </Menu>
                        </ProSidebar>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menulat;