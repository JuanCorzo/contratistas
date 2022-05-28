import React from 'react';
import logo from './assets/images/logo-esap_blanco.png';
import pers from './assets/images/img5.jpg';
import Cookies from 'universal-cookie';
import hambur from './assets/images/hamburger.png';
const cookies = new Cookies(); 

const Tolbar = ({openSidebar}) => {
    return (
        <React.Fragment>
        <div>
            <div className="am-header">
                <div className="am-header-left">&nbsp;&nbsp;
                    <img src={logo} alt="Logo" height="45px" />
                </div>
                <div className="am-header-left logoblanco">
                ESAP - SIGIP - Sistema Integrado de Gestión de Ingresos Parafiscales
                </div>
                <div className="am-header-left" >
                </div>
                <div className="am-header-right">
                    <div className="dropdown dropdown-notification">
                        <div className="dropdown-menu wd-300 pd-0-force">
                        </div>
                    </div>
                    <div className="dropdown dropdown-profile">
                            <span className="logged-name"><span className="hidden-xs-down nombret">
                            {
                                cookies.get("inicial")
                            }</span>
                            </span>
                        <div className="dropdown-menu wd-200">
                            <ul className="list-unstyled user-profile-nav">
                                {/*<li><NavLink to="/EditarPerfil"><i className="icon ion-ios-person-outline"></i> Editar perfil</NavLink></li>
                                <li><NavLink to="/inicio"><i className="icon ion-power"></i> Salir</NavLink></li>*/}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='tool-bar' onClick={openSidebar}><img src={hambur}/></div>
        {/*<Titulo titulo="Entidades aportanes"/>*/}

        </React.Fragment>
    );
}
export default Tolbar;