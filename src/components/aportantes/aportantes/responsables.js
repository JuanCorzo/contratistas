import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import EncTabla from '../../../comunes/EncTabla';
import Tabla from '../../../comunes/Tabla';
import Tabla3 from '../../../comunes/Tabla3';
import Script3 from '../../../scripts/scripts3';
import Fila3 from '../../../comunes/fila3';
import Moment from 'react-moment';
import axios from 'axios';
import global from '../../../Global';
import swal from 'sweetalert';
import Descargado from '../../../comunes/descargardocs';
import Titulo3 from '../../../comunes/Titulo3';

const cookies = new Cookies();
class clasificaAportantes extends Component {

    state = {
        rols: [], enti: [], logs: [], facs: [], dent: [], tabe1: [], tabe2: [], status: null,
        idd: [], file: null, aport: 0, lit1: [], lit2: []
    };
    handleSubmitFile = (e) => {
        e.preventDefault();
        if (this.state.file !== null) {
            var forv = this.state.facs.length;
            var factors = "";
            for (var i = 0; i < forv; i++) {
                var camp = "par" + i;
                if (document.getElementById(camp).checked === true) {
                    factors += (document.getElementById(camp).value) + ", ";
                }
            }
            factors = factors.substring(0, factors.length - 2);
            const idd = this.props.match.params.id;

            let formData = new FormData();
            formData.append('faa_documento', this.state.file);
            formData.append('faa_factores', factors);
            formData.append('aportantes_idaportantes', idd);
            axios.post(global.url + "documentosaportantes/subirfac", formData,
                { headers: { "Content-type": "multipart/form-data;" } }
            ).then(res => {
                swal("Factores salariales cargados", "Se han cargado correctamente los factores salariales", "success");
            })
                .catch(err => {
                    swal("Error de carga", "Error al cargar el documento", "error");
                })
        }
    }
    handleImagePreview = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }
    componentDidMount() {
        const idd = this.props.match.params.id;
        this.setState({ idd });
        axios.get(global.url + "estructuranomnina", global.autentica).then(res => {
            let facs = res.data;
            this.setState({ facs });
        });
        var tabla2 = "aportantes/" + idd;
        axios.get(global.url + tabla2, global.autentica).then((res) => {
            const dent = res.data;
            this.setState({ dent });
            /** console.log(dent); **/
        });
        axios.get(global.url + "logs/" + idd, global.autentica).then((res) => {
            const logs = res.data;
            this.setState({ logs });
        });
        axios.get(global.url + "reportes/filtro5/" + idd, global.autentica).then((res) => {
            var tabe = res.data;
            var lit1 = tabe;
            this.setState({ lit1 });
            let tabe1 =
                [
                    [
                        { type: 'string', id: 'Aportante' },
                        { type: 'string', id: 'Documento/enlace' },
                        { type: 'date', id: 'Inicio' },
                        { type: 'date', id: 'Fin' },
                    ],
                ]
            for (var i = 0; i < tabe.length; i += 1) {
                var fech1 = tabe[i].fecha.substr(0, 10);
                var fech2 = fech1.split("-");
                var ano = fech2[0];
                var mes = fech2[1];
                mes = mes - 1;
                if (mes < 0) { mes = 12; ano--; }
                var dia = fech2[2];
                var dia2 = parseInt(dia) + 1;
                if (mes === 0 || mes === 2 || mes === 4 || mes === 6 || mes === 7 || mes === 9 || mes === 11) {
                    if (dia2 === 32) { dia2 = 1; mes++; }
                    if (mes === 12) { mes = 1; }
                }
                else if (mes === 1) {
                    if (dia2 === 29) { dia2 = 1; mes++; }
                }
                else if (mes === 3 || mes === 5 || mes === 8 || mes === 10) {
                    if (dia2 === 31) { dia2 = 1; mes++; }
                }
                if (mes === 12) { mes = 11; ano--; }
                var desde = new Date(ano, mes, dia);
                var hasta = new Date(ano, mes, dia2);
                tabe1.push([tabe[i].apo_identificacion, tabe[i].tipo, desde, hasta]);
            }
            this.setState({ tabe1 });
        });
        axios.get(global.url + "reportes/filtro6/" + idd, global.autentica).then((res) => {
            var tabe = res.data;
            var lit2 = tabe;
            this.setState({ lit2 });
            let tabe2 =
                [
                    [
                        { type: 'string', id: 'Aportante' },
                        { type: 'string', id: 'Documento/enlace' },
                        { type: 'date', id: 'Inicio' },
                        { type: 'date', id: 'Fin' },
                    ],
                ]
            for (var i = 0; i < tabe.length; i += 1) {
                var fech1 = tabe[i].fecha.substr(0, 10);
                var fech2 = fech1.split("-");
                var ano = fech2[0];
                var mes = fech2[1];
                mes = mes - 1;
                if (mes < 0) { mes = 12; ano--; }
                var dia = fech2[2];
                var dia2 = parseInt(dia) + 1;
                if (mes === 0 || mes === 2 || mes === 4 || mes === 6 || mes === 7 || mes === 9 || mes === 11) {
                    if (dia2 === 32) { dia2 = 1; mes++; }
                    if (mes === 12) { mes = 1; }
                }
                else if (mes === 1) {
                    if (dia2 === 29) { dia2 = 1; mes++; }
                }
                else if (mes === 3 || mes === 5 || mes === 8 || mes === 10) {
                    if (dia2 === 31) { dia2 = 1; mes++; }
                }
                if (mes === 12) { mes = 11; ano--; }
                var desde = new Date(ano, mes, dia);
                var hasta = new Date(ano, mes, dia2);
                tabe2.push([tabe[i].apo_identificacion, tabe[i].tipo, desde, hasta]);
            }
            this.setState({ tabe2 });
        });
    }
    dato = (rols) => { this.setState({ rols }); }
    render() {
        if (!cookies.get("idroles")) { return <Redirect to="./" />; }
        if (this.state.status === "Ok") { return <Redirect to="/enlaces" />; }
        const columnas = [
            {
                title: 'Fecha', headerStyle: { "text-align": "center", "padding": "0px" }, field: 'res_fecha', sortable: true, type: 'date',
                render: row => <Moment format="DD MMM YYYY">{row["res_fechacrea"]}</Moment>
            },
            { title: 'Nombre', headerStyle: { "text-align": "center", "padding": "0px" }, field: 'res_nombre', sortable: true },
            { title: 'Cargo', headerStyle: { "text-align": "center", "padding": "0px" }, field: 'res_cargo', sortable: true },
            { title: 'Teléfono', headerStyle: { "text-align": "center", "padding": "0px" }, field: 'res_telefono', sortable: true },
            { title: 'Email', headerStyle: { "text-align": "center", "padding": "0px" }, field: 'res_email', sortable: true },
            {
                title: '', field: 'idresponsables', sortable: false, width: "10%",
                render: row => (<Descargado docid={row["idresponsables"]} tipo="responsable" />)
            }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <div className="am-mainpanel">
                    <div className="card pd-20 pd-sm-40">
                        <form name="forma" onSubmit={this.guardar}>
                            {
                                this.state.dent.map((sin, i) => {
                                    return (
                                        <React.Fragment> 
                                            <br></br>
                                            
                                            <div className='row'>
                                                <div className='col-lg-12 fflitro lineacolor-card'>
                                                    <div className='xill20'>
                                                        <Titulo3 volver="1" titulo={sin.apo_nombre} />
                                                    </div>
                                             
                                                    <div className='row xill20st'>
                                                        <Fila3 ancho="col-lg-3 izqq1 font-15" valor={sin.apo_sufijo === "" ? (sin.apo_identificacion) :
                                                            sin.apo_sufijo === "0" ? (sin.apo_identificacion) : (sin.apo_identificacion + "-" + sin.apo_sufijo)}
                                                            nombre="NIT"></Fila3>
                                                        <Fila3 ancho="col-lg-3 izqq1 font-15" valor={sin.ter_macrozona} nombre="Macrozona"></Fila3>
                                                        <Fila3 ancho="col-lg-3 izqq1 font-15" valor={sin.ter_nombre} nombre="Territorial"></Fila3>
                                                        <Fila3 ancho="col-lg-3 izqq1 font-15" valor={sin.dep_codigo + "-" + sin.dep_nombre} nombre="Departamento"></Fila3>
                                                        <Fila3 ancho="col-lg-3 izqq1 font-15" valor={sin.ciu_codigo + "-" + sin.ciu_nombre} nombre="Municipio"></Fila3>
                                                    </div> 
                                                </div>

                                                <div className='col-lg-12'><br></br></div>

                                                <div className='col-lg-12 mt-3 fflitro lineacolor-card'>
                                                    <Script3 tabla={"responsables/aportante/" + this.props.match.params.id} devuelvedatos={this.dato} />
                                                    {cookies.get("idroles") === "1" || cookies.get("idroles") === "3" ? (
                                                        <React.Fragment>
                                                            <div className='xill20'>
                                                            <EncTabla titulo="Enlaces de la entidad aportante" link={"/crearresp/" + this.state.idd} titulo2="Enlace" />
                                                            </div>
                                                            <Tabla tabla="responsables" columnas={columnas} valores={this.state.rols}
                                                                redire="/aportantes" titulo="Enlaces" link="/editaresp/" />
                                                        </React.Fragment>) : (
                                                        <React.Fragment>
                                                            <div className='xill20'>
                                                                <h6 className="actions">Enlaces de la entidad aportante</h6>
                                                                <Tabla3 tabla="responsables" columnas={columnas} valores={this.state.rols}
                                                                    redire="/aportantes" titulo="Enlaces" link="/editaresp/" />
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                    }
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                })
                            }
                            
                            <div className='col-lg-12'><br></br></div>
                            <div className="row fflitro mt-3 lineacolor-card">
                                <div className="col-md-12">
                                    <br></br>
                                    <h6 className='actions'>Factores salariales certificados</h6>
                                    {
                                        this.state.facs.map((con, i) => {
                                            var color = "row fofbl";
                                            if (i % 2 === 0) { color = "row xfofgr"; }
                                            return (
                                                <div className={color}>
                                                    <div className='xrowgrid'>
                                                    <div className="col-md-1 izqq">
                                                        {
                                                            cookies.get("idroles") === "1" || cookies.get("idroles") === "3" ? (
                                                                <input name={"par" + i} id={"par" + i} ref={i} defaultValue={con.est_nombre} className="" type="checkbox" />
                                                            ) : (<React.Fragment></React.Fragment>)
                                                        }
                                                    </div>
                                                    </div>
                                                    <div className="col-md-6 izqq xrowfont">{con.est_nombre}</div>
                                                    <div className="col-md-5 izqq xrowfont">{con.est_descripcion}</div>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        cookies.get("idroles") === "1" || cookies.get("idroles") === "3" ? (
                                            <React.Fragment>
                                                <div className="row fofgr">
                                                    <div className='col-md-1'></div>
                                                    <br></br>
                                                    <div className="col-md-12 izqq">
                                                        <label for="upload"><h6 className='xh6'>Soporte de Modificacion</h6></label>
                                                        <input type="file"  onChange={this.handleImagePreview} name="docs_aportantes" id="upload"></input>
                                                    </div>

												
                                                </div>
                                                <div className="row fofbl">
                                                    <div className="col-md-6 izqq">
                                                    </div>
                                                    <div className="col-md-6 derechas"><br></br>
                                                        <input type="submit" className="btn btn-primary pd-x-20" onClick={this.handleSubmitFile} value="Guardar" />
                                                    </div>
                                                </div>
                                                <br></br> 
													
                                            </React.Fragment>) : (<React.Fragment></React.Fragment>)
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div className="card xill">
                        <div className="row fflitro lineacolor-card">
                            <div className="col-md-12">
                                <br></br>
                                <h6 className="actions">Línea de tiempo enlaces</h6> 
								<hr />
                                <div className='timeline'> 
                                    {
                                        this.state.lit1.map((con, i) => {
                                            return (
											
                                                <div className="row xrow">
													<div className="v-line"></div>
                                                    <div className='col-lg-3'><b>{con.fecha.substr(0, 10)}</b><br></br></div>
                                                    <div className='col-lg-1'><i className="icon ion-person xiconlt"></i></div>
                                                    <div className='col-lg-6 text timeline-body'><b>{con.nombre}</b><br></br>
                                                        {con.ruta}<br></br><a href={"mailto:" + con.res_email}>{con.res_email}</a><br></br>
                                                    </div>
                                                    <div className='col-lg-1'><Descargado docid="1" tipo="responsable" /><br></br></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <br></br>
                            </div>
                        </div>
                    </div>

                    <div className="card xill">
                        <div className="row fflitro lineacolor-card">
                            <div className="col-md-12">
                            <br></br>
                            <h6 className="actions">Línea de tiempo factores salariales</h6> 
							<hr />
                                <div className='timeline'> 
                                    {
                                        this.state.lit2.map((con, i) => {
                                            return (
                                                <div className="row xrow">
													<div className="v-line"></div>
                                                    <div className='col-lg-3'><b>{con.fecha.substr(0, 10)}</b><br></br></div>
                                                    <div className='col-lg-1'><i className="icon ion-clock xiconlfs"></i></div>
                                                    <div className='col-lg-6 xtext timeline-body'><b className='xtext'>{con.tipo}</b><br></br></div>
                                                    <div className='col-lg-1'><Descargado docid="1" tipo="responsable" /><br></br></div>
                                                </div>
                                            )
                                        })
                                    }
                                </div> 
                                <br></br> 
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <br></br>
                <Footer></Footer>
            </div>
        );
    }
}
export default clasificaAportantes;