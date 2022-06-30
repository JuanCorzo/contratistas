import React, { Component } from 'react';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Fila from '../../../comunes/fila';
import { actualiza } from '../../../scripts/scripts';
import Script2 from '../../../scripts/scripts2';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';

const cookies = new Cookies();

class editamiusuario extends Component {
    idc = null;
    state = { role: [], usua: [], status: null };
    componentDidMount() {
        this.idc = this.props.match.params.id;
    }
    guardar = (e) => {
        e.preventDefault();
        var pas1=document.forma.Password.value;
        var pas2=document.forma.Password1.value;
        if(pas1!==pas2){
            swal('Error', 'Las contraseñas no son iguales', 'error' );
            return;
        }
        const tabe = {
            "usu_nombre": document.forma.Nombre.value,
            "usu_email": document.forma.Email.value,
            "usu_password": document.forma.Password.value,
        }
        const id=cookies.get("idusuarios");
        actualiza(tabe, "usuarios/editamiusuario", "Usuario", id, "/editamiusuario");
        this.setState({ status: 'Ok' })
    }
    dato = (usua) => {
        this.setState(usua);
        document.forma.Nombre.value = this.state[0].usu_nombre;
        document.forma.Email.value = this.state[0].usu_email;
    }
    render() {
        if (cookies.get("idroles") === "") { return <Redirect to="./" />; }
        if (this.state.status === "Ok") { return <Redirect to="/inicio" />; }
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Editar Usuario" />
                <div className="am-mainpanel">
                    <div className="am-pagebody">
                        <div className="card pd-20 pd-sm-40">
                            <h6 className="card-body-title">Editar Contraseña</h6>
                            <form name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
									<div className="row mt-4">
                                        <Fila nombre="" refer="Nombre" tipo="10" arreglo="" defecto={this.state.usu_nombre} id="" />
                                        <Fila nombre="" refer="Email" tipo="10" arreglo="" id="" defecto={this.state.usu_email} />
										</div>
									<div className="row mt-4">
										<Fila nombre="Digite su contraseña" refer="Password" tipo="4" arreglo="" id="" defecto="" />
										<Fila nombre="Confirme su contraseña" refer="Password1" tipo="4" arreglo="" id="" defecto="" />
									</div>
                                      
                                    </div>
                                    <Script2 id={cookies.get("idusuarios")} tabla="usuarios" devuelvedatos={this.dato} />
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary"><i className="xicon icon ion-android-checkbox-outline" ></i>Guardar Cambios</button>
                                    </div>
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
export default editamiusuario;