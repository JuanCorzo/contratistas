import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Botones from '../../../comunes/Botones';
import Fila from '../../../comunes/fila';
import { guarda } from '../../../scripts/scripts';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import global from '../../../Global';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

class Crearmuni extends Component {
    state = { muni: {}, cons:[], cargos:['Talento humano', 'Pagador', 
    'Responsable de presupuesto', 'Responsable liquidación nómina',  
    'Responsable jurídico'], status: null, idc:null, file: null, aport: 0 };
    componentDidMount() {
        var idc=this.props.match.params.id;
        this.setState({ idc });
    }
    guardar = (e) =>{
        e.preventDefault(); 
        if (this.state.file !== null) {
            
            let formData = new FormData();
            formData.append('res_documento', this.state.file);
            formData.append('res_nombre', document.forma.Nombre.value);
            formData.append('res_identificacion', document.forma.Identificacion.value);
            formData.append('res_cargo', document.forma.Cargo.value);
            formData.append('res_telefono', document.forma.Celular.value);
            formData.append('res_email', document.forma.Email.value);
            formData.append('res_fecha', document.forma.Fecha.value);
            formData.append('aportantes_idaportantes', this.state.idc);
            console.log("asdas", this.state.idc);
            axios.post(global.url+"documentosaportantes/subirenla",formData,
            { headers: { "Content-type": "multipart/form-data;"}}
            ).then(res => { 
                swal("Enlace cargado", "Se ha cargado correctamente el enlace", "success");
            })
            .catch(err => {
                swal("Error de carga", "Error al cargar el enlace", "error");
            })
        }
        else {
            const tabe = {
                "aportantes_idaportantes": this.state.idc, 
                "res_nombre": document.forma.Nombre.value, 
                "res_identificacion": document.forma.Identificacion.value, 
                "res_cargo": document.forma.Cargo.value, 
                "res_telefono": document.forma.Celular.value, 
                "res_email": document.forma.Email.value, 
                "res_fecha": document.forma.Fecha.value 
            }
            guarda(tabe, "responsables", "Enlace entidad aportante", "/aportantes");
        }
        this.setState({ status: 'Ok'})
    }
    handleImagePreview = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }

    render() {
        if(cookies.get("idroles")!=="1" && cookies.get("idroles")!=="8"){return <Redirect to="./"/>;}
        //if(this.state.status==="Ok"){ return <Redirect to="/aportantes"/>; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Agregar Enlace Entidad Aportante"/>
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Agregar Enlace Entidad Aportante</h6>
                            <form  name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                    <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" />
                                    <Fila nombre="Identificación" refer="Identificacion" tipo="1" arreglo="" />
                                    <Fila nombre="Cargo" refer="Cargo" tipo="6" arreglo={this.state.cargos} />
                                    <Fila nombre="Email" refer="Email" tipo="3" arreglo="" />
                                    <Fila nombre="Teléfono" refer="Celular" tipo="1" arreglo="" />
                                    <Fila nombre="Fecha de posesión" refer="Fecha" tipo="7" arreglo="" />
                                    <div className="row">
                                        <div className="col-md-6 izqq">Soporte de designación</div>
                                        <div className="col-md-6 derechas">
                                        <input type="file" className="form-control" onChange={this.handleImagePreview} name="docs_aportantes"/>
                                        </div>
                                    </div>
                                </div> 
                                <Botones enlace='/aportantes'/>    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default Crearmuni;