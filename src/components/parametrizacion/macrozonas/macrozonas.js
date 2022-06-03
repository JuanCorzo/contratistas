import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Script3 from '../../../scripts/scripts3';
import EncTabla from '../../../comunes/EncTabla';
import Tabla from '../../../comunes/Tabla';
import Tabla3 from '../../../comunes/Tabla3';
import axios from 'axios';
import global from '../../../Global';
import Breadcrumb from '../../../layout/Breadcrumb';


const cookies = new Cookies(); 
class Roles extends Component {
    state = { rols:[], status: null, dato:"" };
    componentDidMount() {  }
    dato = (rols) => { 
        this.setState({ rols }); 
        axios.get(global.url + "macrozonas", global.autentica)
        .then(res => {
            let rols = res.data;
            rols =  rols.map( (p) => { p['idc'] = p.idmacrozonas; return p; });
            this.setState({ rols });
        });
    }
    render() {
        if(!cookies.get("idroles")){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/macrozonas"/>;}
        const columnas = [
            { title: 'ID', field:'idc', sortable: true },
            { title: 'Macrozona', field: 'mac_nombre', sortable: true }
        ]
        let linksBreadcrumb = [{href:"inicio", name:"Inicio"}, {href:"macrozonas", name:"macrozonas"}];
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
<<<<<<< HEAD
                <div className='m-auto pt-5'>
=======
>>>>>>> 994a213ba350bf910fb706ff1ecb24b1c3b3931c
                        <Titulo titulo="Macrozonas"/>
                        <div className="am-mainpanel">
                            <Breadcrumb links={linksBreadcrumb}></Breadcrumb>
                            <div className="card pd-20 pd-sm-40">
                                <Script3 tabla="macrozonas" devuelvedatos={this.dato} />
                                { cookies.get("idroles")==="1"? (
                                    <React.Fragment>
                                        <EncTabla titulo="Macrozonas" link="/crearmacr" titulo2="Macrozona" />
                                        <Tabla tabla="macrozonas" columnas={columnas} valores={this.state.rols}
                                        redire="/macrozonas" titulo="Macrozonas" link="editamacr/" />
                                    </React.Fragment>
                                ): (
                                    <React.Fragment>
                                        <h6 className="card-body-title">Macrozonas</h6>
                                        <Tabla3 tabla="macrozonas" columnas={columnas} valores={this.state.rols}
                                        redire="/macrozonas" titulo="Macrozonas" link="editamacr/" />
                                    </React.Fragment>

                                )
                            }
                            </div>
                    
                        <Footer></Footer>
                    </div>
            </div>        
        );
    }
}
export default Roles;