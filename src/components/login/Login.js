import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom';
import global from '../../Global'; 
import Cookies from 'universal-cookie';
import '../../assets/css/Dashboard.css';
import logo from "../../assets/images/logo-esap_blanco.png";
import govco from "../../assets/images/govco.png";

import '../../assets/css/bootstrap.min.css';
import '../../assets/css/bootstrap.rtl.only.min.css';
import '../../assets/css/bootstrap-float-label.min.css';
import '../../assets/css/main.css';


const cookies = new Cookies(); 
class Login extends Component {
    Email = React.createRef(); 
    Contrasena = React.createRef(); 
    state = {
        status: null,
        correo: "",
        clave: "",
    };
    Login = (e) => {
        e.preventDefault();
        var correo=this.Email.current.value;
        var clave=this.Contrasena.current.value;
        axios.post(global.url + "auth/login/", {usu_email: correo, usu_password: clave})
        .then((res) => {
            var respuesta=res.data;
            var rsd=respuesta.result.usu_nombre.split(" ");
            var pn=rsd[0].substr(0,1)+(rsd[1]?.substr(0,1) || "");
            cookies.set("idusuarios", respuesta.result.idusuarios, {path:"/"});
            cookies.set("idroles", respuesta.result.iroles, {path:"/"});
            cookies.set("nombre", respuesta.result.usu_nombre, {path:"/"});
            cookies.set("inicial", pn, {path:"/"});
            cookies.set("token", respuesta.result.token, {path:"/"});
            cookies.set("usu_idmacrozona", respuesta.result.usu_idmacrozona, {path:"/"});
            cookies.set("usu_idterritorial", respuesta.result.usu_idterritorial, {path:"/"});
            cookies.set("revision", "No", {path:"/"});
            if(respuesta.result.aute==="Ok"){ this.setState({ status: 'Ok'}) }
            else {
                swal("Login incorrecto", "Usuarrio o password incorrecto", "error");
            }
        })
        .catch((error) => {
          swal("Login incorrecto", "Usuarrio o password incorrecto", "error");
          console.log(error);
        });
    }
    componentDidMount(){
      cookies.remove("idusuarios");
      cookies.remove("idroles");
      cookies.remove("nombre");
    }
    render() { 
        if(this.state.status==="Ok"){
            return <Redirect to="/Inicio"/>;
        }
        else {}
        return (
            <div className="back">
    <div className="fixed-background"></div>
    <main>
        <div className="container">
            <div className="row h-100">
                <div className="col-12 col-md-10 mx-auto my-auto">
                    <div className="card auth-card cardlogin" >
                        <div className="position-relative imgside ">
                        <p className="titullog">SIGIP</p>
                            <p>{}</p>
                            <form onSubmit={this.Login} name="forma">
                                <label className="form-group has-float-label mb-4">
                                    <input className="form-control" placeholder='Email o usuario' ref={this.Email} type="email" />
                                </label>
                                <label className="form-group has-float-label mb-4">
                                    <input className="form-control" placeholder='Contraseña' ref={this.Contrasena} type="password" />
                                </label>
                                <div className="d-flex dere">
                                    <input className="botonlogin" type="submit" value="Entrar"/>
                                </div>
                            </form>
                        </div>
                        <div className="formside" style={{"backgroundColor":"#016bb7"}}>
                            <p className="white mb-0">
                            SISTEMA INTEGRADO DE GESTIÓN DE INGRESOS PARAFISCALES
                            </p><br></br>
                            <div className='linea'></div><br></br>
                            <p className='white2'><b>Escuela Superior de Administración Pública</b><br></br>
                            At. telefónica en Bogotá (+57601) 7956110, resto del país PBX 018000423713<br></br>
                            Sede Principal Calle 44 # 53-37 CAN, Bogotá D.C. - CP: 111321</p>
                            <br></br><br></br>
                            <table width="100%">
                                <tbody>
                                    <tr>
                                        <td><img src={logo} width='60px'/></td>
                                        <td>&nbsp;</td>
                                        <td className='white2'>Escuela Superior de Administración Pública</td>
                                        <td><img src={govco} width='140px'/></td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>


        );
    }
}
export default Login;