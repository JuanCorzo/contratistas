import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
/** import { FaAlignJustify } from 'react-icons/fa';   **/

const cookies = new Cookies(); 


class Header extends Component {

    render() {

        return (
			
            <div className="am-header" style={{padding: "25px"}}>  
			
                <div className="logoblanco" style={{marginLeft: "129px"}}>
                <h1 className="xxh1">SIGID</h1>
                </div>
                <div className="am-header-left">
                </div>
                <div className="am-header-right">
                    <div className="dropdown dropdown-notification">
                        <div className="dropdown-menu wd-300 pd-0-force">
                        </div>
                    </div>
                    <div className="nombret">
                        { cookies.get("inicial") }
                    </div>
                    <div className="dropdown dropdown-profile texblanco">
                        { cookies.get("nombre") }
                        <div className="dropdown-menu wd-200">
                            <ul className="list-unstyled user-profile-nav">
                                <li><NavLink to="/EditarPerfil"><i className="icon ion-ios-person-outline"></i> Editar perfil</NavLink></li>
                                <li><NavLink to="/inicio"><i className="icon ion-power"></i> Salir</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}
export default Header;