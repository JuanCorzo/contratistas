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

const cookies = new Cookies(); 
class Menus extends Component {
    state = { tabl: [], status: null};
    componentDidMount() {}
    dato = (rols) => { 
        this.setState({ rols });  
        axios.get(global.url + "menus", global.autentica)
        .then(res => {
            let rols = res.data;
            rols =  rols.map( (p) => { p['idc'] = p.idmenus; return p; });
            this.setState({ rols });
        });
    }
    render() {
      if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26"){ return <Redirect to="./"/>; }
      const columnas = [
        { title: 'ID', field:'idc', sortable: true },
        { title: 'Nombre', field:'men_nombre', sortable: true},
        { title: 'Ruta', field: 'men_ruta', sortable: true },
        { title: 'Orden', field: 'men_orden', sortable: true },
        { title: 'Categoría', field: 'men_categoria', sortable: true },
      ]
      return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                    <div className='w-75 pt-5 m-auto'>
                        <Titulo titulo="Menus"/>
                        <div className="am-mainpanel">
                            <div className="card pd-20 pd-sm-40">
                                <Script3 tabla="menus" devuelvedatos={this.dato} />
                                <EncTabla titulo="Menus" link="/Crearmenu" titulo2="Menus" />
                                <Tabla tabla="menus" columnas={columnas} valores={this.state.rols} 
                                redire="/Menus" titulo="Menu" link="editamenu/" />
                            </div>
                        </div>
                    </div>    
            <Footer></Footer>
            </div>
        );
    }
}
export default Menus;