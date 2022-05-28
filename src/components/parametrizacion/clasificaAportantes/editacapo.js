import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 


class editacapo extends Component {
    Rol = React.createRef(); 
    idc = null;
    state = { rols:[], status: null, dato:"" };
    componentDidMount() { 
        this.idc=this.props.match.params.id; 
    }
    guardar = (e) =>{
        e.preventDefault();
        const tabe = { 
            cla_codigo: document.forma.Codigo.value,
            cla_nombre: document.forma.Nombre.value
        }
        actualiza(tabe, "clasificacionesaportantes", "Clasificación aportantes", this.idc, "/Clasificacion-aportantes");
        this.setState({ status: 'Ok'})
    }
    dato = (rols) => { 
        this.setState(rols);
        document.forma.Codigo.value=this.state[0].cla_codigo; 
        document.forma.Nombre.value=this.state[0].cla_nombre;  
    }
    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8"  && cookies.get("idroles")!=="26"){return <Redirect to="./"/>;}
        if(this.state.status==="Ok"){return <Redirect to="/Clasificacion-aportantes"/>;}
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Clasificación de aportantes por obligatoriedad"/>
                <div className="am-mainpanel">
                        <div className="card pd-20 pd-sm-40">
                          <Script2 id={this.props.match.params.id} tabla="clasificacionesaportantes" devuelvedatos={this.dato} />
                            <h6 className="card-body-title">Editar Clasificación de aportantes por obligatoriedad</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Fila nombre="Código" refer="Codigo" tipo="1" arreglo="" defecto={this.state.cla_codigo}  />
                                    <Fila nombre="Clasificación" refer="Nombre" tipo="1" arreglo="" defecto={this.state.cla_nombre} />
                                    </div>
                                    <Botones enlace='/Clasificacion-aportantes'/>    
                                </div>
                            </form>
                        </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default editacapo;