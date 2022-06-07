import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import { Redirect } from 'react-router-dom';
import Script3 from '../../../scripts/scripts3';
import EncTabla from '../../../comunes/EncTabla';
import Tabla from '../../../comunes/Tabla';
import axios from 'axios';
import global from '../../../Global';

const cookies = new Cookies(); 
class Permisos extends Component {
    Rol = React.createRef(); 
    state = { tabl: [], status: null, deps:[]};
    dato = (tabl) => { 
        this.setState({ tabl }); 
        axios.get(global.url + "permisos", global.autentica)
        .then(res => {
            let tabl = res.data;
            tabl =  tabl.map( (p) => { p['idc'] = p.idpermisos; return p; });
            this.setState({ tabl });
        });
    }
    componentDidMount() {}
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="26") { return <Redirect to="./"/>; }
        const columnas = [
            { title: 'Rol', field:'rol_nombre', sortable: true},
            { title: 'Categoría', field: 'men_categoria', sortable: true },
            { title: 'Menú', field: 'men_nombre', sortable: true },
            { title: 'Crear', field: 'per_crear', sortable: true },
            { title: 'Editar', field: 'per_editar', sortable: true },
            { title: 'Eliminar', field: 'per_eliminar', sortable: true },
        ]
       
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                                  
                <div className='pt-4 m-auto'>
                    <div className="am-mainpanel">
                        
                        <div className="card pd-20 pd-sm-40">
                            <Script3 tabla="permisos" devuelvedatos={this.dato} /><br/>
                            <EncTabla titulo="Permisos" link="/Crearperm" titulo2="Permisos" />
                            <Tabla tabla="permisos" columnas={columnas} valores={this.state.tabl} 
                            redire="/permisos" titulo="Permisos" link="editaperm/" />
                        </div>
                    </div>
                </div>      
                <Footer></Footer>
            </div>
        );
    }
}
export default Permisos;