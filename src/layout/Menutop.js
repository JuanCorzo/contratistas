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
            <div></div>
        );
    }
}

export default Menulat;