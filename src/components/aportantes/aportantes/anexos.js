import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Header from '../../../layout/Header';
import Menulat from '../../../layout/Menulat';
import Footer from '../../../layout/Footer';
import Titulo from '../../../comunes/Titulo';
import Tabla from '../../../comunes/Tabla2';
import Tabla3 from '../../../comunes/Tabla3';
import Script3 from '../../../scripts/scripts3';
import Moment from 'react-moment';
import axios from 'axios';
import global from '../../../Global';
import Descargado from '../../../comunes/descargardocs';
import EncTabla from '../../../comunes/EncTabla';
import Fila from '../../../comunes/fila';
import swal from 'sweetalert';
import Fila3 from '../../../comunes/fila3';
import Titulo3 from '../../../comunes/Titulo3';

const cookies = new Cookies();
class anexos extends Component {
    state = {
        rols: [], enti: [], dent: [], tidc: [], status: null, idd: [], tabe1: [], tabe2: [],
        tipos: ["De obligada a no obligada", "De no obligada a obligada", "De en estudio de obligatoriedad a obligada",
            "De en estudio de obligatoriedad a no obligada", "De NIT principal a sub unidad ejecutora del gasto",
            "De sub unidad ejecutora del gasto a NIT principal"], tabe3: []
    };
    handleSubmitFile = (e) => {
        e.preventDefault();
        if (this.state.file !== null) {
            const idd = this.props.match.params.id;
            const idusuario = cookies.get("idusuarios");
            let formData = new FormData();
            formData.append('tra_ruta', this.state.file);
            formData.append('tra_tipo', document.forma.tipo.value);
            formData.append('tra_observaciones', document.forma.observacion.value);
            formData.append('tra_usuario', idusuario);
            formData.append('aportantes_idaportantes', idd);
            axios.post(global.url + "documentosaportantes/subirtran", formData,
                { headers: { "Content-type": "multipart/form-data;" } }
            ).then(res => {
                const tip = document.forma.tipo.value;
                if (tip === "De NIT principal a sub unidad ejecutora del gasto") {
                    const tabe1 = { "sectores_idsectores": "14" }
                    axios.put(global.url + "aportantes/editasector/" + idd, tabe1, global.autentica).then(res => { });
                }
                else if (tip === "De sub unidad ejecutora del gasto a NIT principal") {
                    const tabe1 = { "sectores_idsectores": "1" }
                    axios.put(global.url + "aportantes/editasector/" + idd, tabe1, global.autentica).then(res => { });
                }
                else if (tip === "De obligada a no obligada") {
                    const tabe1 = { "clasificaaportantes_idclasificaaportantes": "2" }
                    axios.put(global.url + "aportantes/editaclasifica/" + idd, tabe1, global.autentica).then(res => {
                    });
                }
                else if (tip === "De no obligada a obligada") {
                    const tabe1 = { "clasificaaportantes_idclasificaaportantes": "1" }
                    axios.put(global.url + "aportantes/editaclasifica/" + idd, tabe1, global.autentica).then(res => { });
                }
                else if (tip === "De en estudio de obligatoriedad a obligada") {
                    const tabe1 = { "clasificaaportantes_idclasificaaportantes": "1" }
                    axios.put(global.url + "aportantes/editaclasifica/" + idd, tabe1, global.autentica).then(res => { });
                }
                else if (tip === "De en estudio de obligatoriedad a no obligada") {
                    const tabe1 = { "clasificaaportantes_idclasificaaportantes": "2" }
                    axios.put(global.url + "aportantes/editaclasifica/" + idd, tabe1, global.autentica).then(res => { });
                }
                swal("La Transición de la entidad ha sido cargada", "Se ha cargado correctamente la transición de la entidad", "success");
                this.llena();
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
        this.llena();
    }
    llena = (e) => {
        const idd = this.props.match.params.id;
        this.setState({ idd });
        axios.get(global.url + "tiposdocumentos", global.autentica).then(res => {
            let tidc = res.data;
            this.setState({ tidc });
        });
        var tabla2 = "aportantes/" + idd;
        axios.get(global.url + tabla2, global.autentica).then((res) => {
            const dent = res.data;
            this.setState({ dent });
        });
        axios.get(global.url + "reportes/filtro7/" + idd + "/1", global.autentica).then((res) => {
            var tabe1 = res.data;
            /* let tabe2 =
            [
                [
                    { type: 'string', id: 'Aportante' },
                    { type: 'string', id: 'Documento/enlace' },
                    { type: 'date', id: 'Inicio' },
                    { type: 'date', id: 'Fin' },
                ],
            ]
            for (var i=0; i<tabe.length; i+=1) {
                var fech1=tabe[i].fecha.substr(0,10);
                var fech2=fech1.split("-");
                var ano=fech2[0];
                var mes=fech2[1];
                mes=mes-1;
                if(mes<0){ mes=12; ano--; }
                var dia=fech2[2];
                var dia2=parseInt(dia)+1;
                if(mes===0 || mes===2 || mes===4 || mes===6 || mes===7 || mes===9 || mes===11)
                {
                    if(dia2===32){ dia2=1; mes++; }
                    if(mes===12){ mes=1; }
                }
                else if(mes===1){
                    if(dia2===29){ dia2=1; mes++; }
                }
                else if(mes===3 || mes===5 || mes===8 || mes===10) 
                {
                    if(dia2===31){ dia2=1; mes++; }
                }
                if(mes===12){ mes=11; ano--;}
                var desde= new Date(ano, mes, dia);
                var hasta= new Date(ano, mes, dia2);
                tabe1.push([tabe[i].apo_identificacion, tabe[i].tipo, desde, hasta]);
            }*/
            this.setState({ tabe1 });
        });
        axios.get(global.url + "reportes/filtro7/" + idd + "/2", global.autentica).then((res) => {
            var tabe2 = res.data;
            /*let tabe3 =
            [
                [
                    { type: 'string', id: 'Aportante' },
                    { type: 'string', id: 'Documento/enlace' },
                    { type: 'date', id: 'Inicio' },
                    { type: 'date', id: 'Fin' },
                ],
            ]
            for (var i=0; i<tabe.length; i+=1) {
                var fech1=tabe[i].fecha.substr(0,10);
                var fech2=fech1.split("-");
                var ano=fech2[0];
                var mes=fech2[1];
                mes=mes-1;
                if(mes<0){ mes=12; ano--; }
                var dia=fech2[2];
                var dia2=parseInt(dia)+1;
                if(mes===0 || mes===2 || mes===4 || mes===6 || mes===7 || mes===9 || mes===11)
                {
                    if(dia2===32){ dia2=1; mes++; }
                    if(mes===12){ mes=1; }
                }
                else if(mes===1){
                    if(dia2===29){ dia2=1; mes++; }
                }
                else if(mes===3 || mes===5 || mes===8 || mes===10) 
                {
                    if(dia2===31){ dia2=1; mes++; }
                }
                if(mes===12){ mes=11; ano--;}
                var desde= new Date(ano, mes, dia);
                var hasta= new Date(ano, mes, dia2);
                tabe2.push([tabe[i].apo_identificacion, tabe[i].tipo, desde, hasta]);
            }*/
            this.setState({ tabe2 });
        });
        axios.get(global.url + "documentosaportantes/transiciones/" + idd, global.autentica).then(res => {
            let tabe3 = res.data;
            this.setState({ tabe3 });
        });
    }
    dato = (rols) => { this.setState({ rols }); }
    render() {
        if (!cookies.get("idroles")) { return <Redirect to="./" />; }
        if (this.state.status === "Ok") { return <Redirect to="/aportantes" />; }
        const columnas = [
            { title: 'Registro', field: 'apo_fecha', sortable: true, type: 'date',
                render: row => <Moment format="DD MMM YYYY">{row["apo_fecha"]}</Moment>
            },
            { title: 'Clasificación', field: 'tid_clasifica', sortable: true },
            { title: 'Documento', field: 'tid_nombre', sortable: true },
            {
                title: 'Anexos', field: 'idc', sortable: false, width: "10%",
                render: row => (<Descargado docid={row["idc"]}  />)
            }
        ]
        const columnas2 = [
            {
                title: 'Fecha', field: 'tra_fecha', sortable: true, type: 'date',
                render: row => <Moment format="DD MMM YYYY">{row["tra_fecha"]}</Moment>
            },
            { title: 'Tipo', field: 'tra_tipo', sortable: true },
            { title: 'Usuario', field: 'usu_nombre', sortable: true },
            {
                title: 'Soporte', field: 'idtransicionesaportantes', sortable: false, width: "10%",
                render: row => (<Descargado docid={row["idtransicionesaportantes"]} tipo='transicion' />)
            }
        ]
        return (
            <div>
                <Header></Header>
                <Menulat></Menulat>
                <Titulo titulo="Documentos entidad aportante" />
                <div className="am-mainpanel">
                    <div className="pd-20 pd-sm-40 mt-3">
                        { 
                            this.state.dent.map((sin, i) => {
                                return (
                                    <React.Fragment>
                                        <br /> 
                                        <div className='row'>
                                            <div className='col-lg-12 fflitro mt-3 lineacolor-card '>
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
                                            <div className='col-lg-12 ffitro mt-4'></div>
                                            <div className='col-lg-12 mt-3 fflitrotable lineacolor-card'>
                                                <Script3 tabla={"documentosaportantes/aportante/" + this.props.match.params.id} devuelvedatos={this.dato} />
                                                {cookies.get("idroles") === "1" || cookies.get("idroles") === "3" ? (
                                                    <React.Fragment>
                                                        <div style={{"padding-top": "20px", "padding-left": "25px", "padding-right": "10px", }}>
                                                        <EncTabla titulo="Anexos" link={"/Crearanex/" + this.state.idd} titulo2="Anexo" />
                                                        </div> 
                                                        <Tabla tabla="documentosaportantes" columnas={columnas} valores={this.state.rols}
                                                            redire="/aportantes" titulo="" link="/Editadoca/" />
                                                    </React.Fragment>) : (
                                                    <React.Fragment>
                                                        <h6 className="actions">Documentos</h6>
                                                        <Tabla3 tabla="documentosaportantes" columnas={columnas} valores={this.state.rols}
                                                            redire="/aportantes" titulo="" link="/Editadoca/" />
                                                    </React.Fragment>
                                                )
                                                }
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>

                    <div className='row xill'>
                        <div className="col-lg-12 fflitro lineacolor-card">
                            <div className="xill20">
                                <form name="forma" onSubmit={this.guardar}>
                                    {
                                        cookies.get("idroles") === "1" || cookies.get("idroles") === "3" ? (
                                            <div className=''>
                                                <h6 className="actions">Reportar una Transición de la entidad</h6> 
                                                <div className="row">
                                                    <Fila nombre="Tipo de cambio" refer="tipo" tipo="6" col="12" arreglo={this.state.tipos} />
                                                    <Fila nombre="Observaciones" refer="observacion" tipo="1" col="12" arreglo="" />
                                                </div>
                                                <div className="row mt-3"> 
                                                    <div className="col-md-12 izqq">
                                                        <label for="upload"><h6 className='xh6'>Soporte de Modificacion</h6></label>
                                                        <input type="file" className="" onChange={this.handleImagePreview} name="docs_aportantes" id="upload" /> 
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 izqq">
                                                    </div>
                                                    <div className="col-md-12 derechas"><br></br>
                                                        <button type="submit" className="btn btn-primary pd-x-20" onClick={this.handleSubmitFile}><i className="xicon icon ion-android-checkbox-outline" ></i> Guardar</button>
                                                        <br></br>
                                                    </div>
                                                </div>
                                            </div>) : (<React.Fragment></React.Fragment>)
                                    }<br></br>
                                    
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className='row xill'>
                        <div className="col-lg-12 fflitro lineacolor-card">
                            <div className='xill20'>
                                <h6 className="actions">Transiciones Realizadas</h6>
                            </div>
                            <div className=''>
                                <Tabla3 tabla="responsables" columnas={columnas2} valores={this.state.tabe3}
                                    redire="/aportantes" titulo="" link="/editaresp/" />
                            </div>
                        </div>
                    </div>
                    
					<div className="card xill">
                        <div className="row fflitro lineacolor-card">
                            <div className="col-md-12">
                                <div>
                                    <h6 className="actions">Clasificación por obligatoriedad</h6> 
                                    <div className='timeline'> 
                                        {
                                            this.state.tabe1.map((con, i) => {
                                                return (
                                                    <div className="row xrow">
														<div className="v-line"></div>
                                                        <div className='col-lg-3'><b>{con.fecha.substr(0, 10)}</b><br></br></div>
                                                        <div className='col-lg-1'><i className="icon ion-clock xiconlfs nombreticon"></i></div>
                                                        <div className='col-lg-6 xtext timeline-body'><b>{con.id + "-" + con.tipo}</b><br></br></div>
                                                        <div className='col-lg-1'><Descargado docid={con.id} tipo="transicion" /><br /></div>
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
      
					<div className="card xill">
                        <div className="row fflitro lineacolor-card">
                            <div className="col-md-12">
                                <div>
                                    <h6 className="actions">Cambios en clasificación por NIT</h6> 
                                    <div className='timeline'> 
                                        {
                                            this.state.tabe2.map((con, i) => {
                                                return (
                                                    <div className="row xrow">
														<div className="v-line"></div>
                                                        <div className='col-lg-3'><b>{con.fecha.substr(0, 10)}</b><br></br></div>
                                                        <div className='col-lg-1'><i className="icon ion-clock xiconlt nombreticon"></i></div>
                                                        <div className='col-lg-6 xtext timeline-body'><b>{con.tipo}</b><br></br></div>
                                                        <div className='col-lg-1'><Descargado docid={con.id} tipo="transicion" /><br></br></div>
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

                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default anexos;