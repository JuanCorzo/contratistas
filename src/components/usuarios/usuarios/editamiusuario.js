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

const cookies = new Cookies();

class editamiusuario extends Component {
    idc = null;
    state = { role: [], usua: [], status: null };
    componentDidMount() {
        this.idc = this.props.match.params.id;
    }
    guardar = (e) => {
        e.preventDefault();
        const tabe = {
            "usu_nombre": document.forma.Nombre.value,
            "usu_email": document.forma.Email.value,
            "usu_celular": document.forma.Celular.value,
            "usu_password": document.forma.Password.value,
        }
        actualiza(tabe, "usuarios/editamiusuario", "Usuario", this.idc, "/editamiusuario");
        this.setState({ status: 'Ok' })
    }
    dato = (usua) => {
        this.setState(usua);
        document.forma.Nombre.value = this.state[0].usu_nombre;
        document.forma.Email.value = this.state[0].usu_email;
        document.forma.Celular.value = this.state[0].usu_celular;
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
                            <h6 className="card-body-title">Editar Usuario</h6>
                            <form name="forma" onSubmit={this.guardar}>
                                <div className="modal-content tx-size-sm">
                                    <div className="modal-body pd-20">
                                        <Fila nombre="Nombre" refer="Nombre" tipo="1" arreglo="" defecto={this.state.usu_nombre} id="" />
                                        <Fila nombre="Email" refer="Email" tipo="3" arreglo="" id="" defecto={this.state.usu_email} />
                                        <Fila nombre="Contraseña" refer="Password" tipo="4" arreglo="" id="" defecto="" />
                                        <Fila nombre="Celular" refer="Celular" tipo="1" arreglo="" id="" defecto={this.state.usu_telefono} />
                                    </div>
                                    <Script2 id={cookies.get("idusuarios")} tabla="usuarios" devuelvedatos={this.dato} />
                                    <div className="modal-footer">
                                        <input type="submit" className="btn btn-info pd-x-20" value="Guardar Cambios" />
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